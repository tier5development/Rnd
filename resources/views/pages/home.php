<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title><?= $title ?></title>
    </head>
    <body>
        <form action="/message" method="post">
            <textarea name="message" placeholder="Message..." rows="5"></textarea>
            <button type="submit">Send</button>
        </form>
    </body>
</html>
