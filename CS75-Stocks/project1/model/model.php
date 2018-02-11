<?php
/*********************************
 * model.php
 *
 * CSCI S-75
 * Project 1
 * Chris Gerber
 *
 * Model for users and portfolios
 *********************************/

require_once('../includes/helper.php');

/*
 * login_user() - Verify account credentials and create session
 *
 * @param string $email
 * @param string $password
 */


function login_user($username, $password)
{


    $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_DATABASE;
    $dbh = new PDO($dsn, DB_USER, DB_PASSWORD);

    // verify email and password pair
    $userid = 0;
    $stmt = $dbh -> prepare("SELECT id FROM users WHERE username = :username AND password = :password");
    $stmt->bindValue(':username',$username,PDO::PARAM_STR);
    $stmt->bindValue(':password',$password,PDO::PARAM_STR);

    $stmt->execute();
    $resource = $stmt->fetch();
    $userid = $resource['id'];


    // close database and return
    $dbh = null;
    return $userid;
}

/*
 * get_user_shares() - Get portfolio for specified userid
 *
 * @param int $userid
 */
function get_user_shares($userid)
{
    // connect to database with PDO
    $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_DATABASE;
    $dbh = new PDO($dsn, DB_USER, DB_PASSWORD);

    // get user's portfolio
    $stmt = $dbh->prepare("SELECT symbol, quantity FROM portfolio WHERE userid=:userid");
    $stmt->bindValue(':userid', $userid, PDO::PARAM_STR);
    if ($stmt->execute())
    {
        $result = array();
        while ($row = $stmt->fetch()) {
            array_push($result, $row);
        }
        $dbh = null;
        return $result;
    }

    // close database and return null
    $dbh = null;
    return null;
}

/*
 * get_quote_data() - Get Yahoo quote data for a symbol
 *
 * @param string $symbol
 */
function get_quote_data($symbol)
{
    $result = array();
    $s = $symbol;

    $line = file("https://www.quandl.com/api/v3/datasets/EOD/{$s}.csv?api_key=8BHstx6chzoaKWg2uaLm&start_date=2018-01-01");

    $stock = explode(',',$line[1]);

    if (isset($stock[1]))
            $result = array("symbol" => $s,
                "date" => $stock[0],
                "open" => $stock[1],
                "high" => $stock[2],
                "low" => $stock[3],
                "close" => $stock[4],
                "volume" => $stock[5],
                "dividend" => $stock[6],
                "split" => $stock[7],
                "adj_open" => $stock[8],
                "adj_high" => $stock[9],
                "adj_low" => $stock[10],
                "adj_close" => $stock[11],
                "adj_volume" => $stock[12]);

    https://www.nasdaq.com/logos/AAPL.GIF


    return $result;
}

/*
 * register_user() - Create a new user account
 *
 * @param string $email
 * @param string $password
 *
 * @return string $error
 */
function register_user($username, $password, $email,$balance)
{
    $userid = 0;

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_DATABASE;
    $dbh = new PDO($dsn, DB_USER, DB_PASSWORD);

    $sql = 'INSERT INTO users(username,password,email,balance) VALUES(:username,:password,:email,:balance)';
    $stmt = $dbh->prepare($sql);
    $stmt->execute(['username' => $username, 'password' => $password, 'email' => $email, 'balance' => $balance]);

    // close database and return
    $dbh = null;
}

function get_id($username,$password){


    $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_DATABASE;
    $dbh = new PDO($dsn, DB_USER, DB_PASSWORD);

    // GET THE USER ID
    $results = $dbh->prepare('SELECT id FROM users WHERE username=:username AND password=:password');

    $results->bindValue(':username',$username,PDO::PARAM_STR);
    $results->bindValue(':password',$password,PDO::PARAM_STR);
    $results->execute();
    $result = $results->fetch();

    $id = $result['id'];

    $dbh = null;

    return $id;


}

function get_user_balance($userid) {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_DATABASE;
    $dbh = new PDO($dsn, DB_USER, DB_PASSWORD);

    // GET THE USER BALANCE
    $results = $dbh->prepare('SELECT balance FROM users WHERE id=:id');

    $results -> bindValue(':id',$userid,PDO::PARAM_STR);
    $results -> execute();
    $result = $results->fetch();

    $balance = $result['balance'];

    $dbh=null;

    return $balance;
}

function buy_shares($symbol,$price, $shares,$userid ) {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_DATABASE;
    $dbh = new PDO($dsn, DB_USER, DB_PASSWORD);


    $sql = ('SELECT * FROM portfolio WHERE userid=:userid AND symbol=:symbol');
    $check = $dbh->prepare($sql);

    $check -> bindValue(':userid',$userid,PDO::PARAM_STR);
    $check -> bindValue(':symbol',$symbol,PDO::PARAM_STR);

    $check->execute();
    $find = $check->fetch();

    if (empty($find)) {

        $sql = 'INSERT INTO portfolio(symbol,price,quantity,userid) VALUES(:symbol,:price,:quantity,:userid)';
        $stmt = $dbh->prepare($sql);
        $stmt->execute(['symbol' => $symbol, 'price' => $price, 'quantity' => $shares, 'userid' => $userid]);

        // GET THE USER BALANCE
        $results = $dbh->prepare('SELECT balance FROM users WHERE id=:id');

        $results->bindValue(':id', $userid, PDO::PARAM_STR);

        $results->execute();
        $result = $results->fetch();

        $balance = $result['balance'];

        $total = $price * $shares;
        $balance = $balance - $total;


        $dbh->beginTransaction();
        $update = $dbh->prepare("UPDATE users SET balance=:balance WHERE id=:id");

        $update->bindValue(':id', $userid, PDO::PARAM_STR);
        $update->bindValue(':balance', $balance, PDO::PARAM_STR);

        $update->execute();

        $dbh->commit();
    }
    else {

        $currentquantity = $find['quantity'];

        $updatedquantity = $currentquantity + $shares;

        //$dbh -> beginTransaction();
        $updated2 = $dbh -> prepare("UPDATE portfolio SET quantity=:quantity WHERE userid=:id");

        $updated2->bindValue(':quantity',$updatedquantity,PDO::PARAM_STR);
        $updated2->bindValue(':id',$userid,PDO::PARAM_STR);

        $updated2->execute();

       // $dbh -> commit();


        // GET THE USER BALANCE
        $results = $dbh->prepare('SELECT balance FROM users WHERE id=:id');

        $results->bindValue(':id', $userid, PDO::PARAM_STR);

        $results->execute();
        $result = $results->fetch();

        $balance = $result['balance'];

        $total = $price * $shares;
        $balance = $balance - $total;


       // $dbh->beginTransaction();
        $update = $dbh->prepare("UPDATE users SET balance=:balance WHERE id=:id");

        $update->bindValue(':id', $userid, PDO::PARAM_STR);
        $update->bindValue(':balance', $balance, PDO::PARAM_STR);

        $update->execute();

        //$dbh->commit();
    }

    // close database and return
    $dbh = null;
}

function sell_shares($userid, $symbol) {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_DATABASE;
    $dbh = new PDO($dsn, DB_USER, DB_PASSWORD);

    $results = $dbh->prepare('SELECT quantity, price FROM portfolio WHERE symbol=:symbol AND userid=:userid');

    $results->bindValue(':symbol',$symbol,PDO::PARAM_STR);
    $results->bindValue(':userid',$userid,PDO::PARAM_STR);

    $results->execute();
    $result = $results->fetch();

    $profit = $result['quantity'] * $result['price'];

    // GET THE USER BALANCE
    $results = $dbh->prepare('SELECT balance FROM users WHERE id=:id');

    $results->bindValue(':id', $userid, PDO::PARAM_STR);

    $results->execute();
    $result = $results->fetch();

    $balance = $result['balance'];
    $balance = $balance + $profit;


    $dbh->beginTransaction();
    $update = $dbh->prepare("UPDATE users SET balance=:balance WHERE id=:id");

    $update->bindValue(':id', $userid, PDO::PARAM_STR);
    $update->bindValue(':balance', $balance, PDO::PARAM_STR);

    $update->execute();

    $dbh -> commit();

    $dbh -> beginTransaction();
    // delete the symbol
    $remove = $dbh -> prepare("DELETE FROM portfolio WHERE userid=:userid AND symbol=:symbol");
    $remove -> bindValue(':userid',$userid,PDO::PARAM_STR);
    $remove -> bindValue(':symbol',$symbol,PDO::PARAM_STR);

    $remove->execute();
    $dbh -> commit();

    $dbh = null;
}

function get_information_user($userid) {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_DATABASE;
    $dbh = new PDO($dsn, DB_USER, DB_PASSWORD);

    // GET THE USER BALANCE
    $results = $dbh->prepare('SELECT * FROM users WHERE id=:id');

    $results -> bindValue(':id',$userid,PDO::PARAM_STR);
    $results -> execute();
    $result = $results->fetch();

    $balance = array('username' => $result['username'] , 'email' => $result['email']);

    $dbh=null;

    return $balance;
}