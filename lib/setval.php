<?php
OCP\User::checkAdminUser();
\OCP\App::checkAppEnabled('shorten');

function setAdminVal() {
        if (isset($_POST['host'])) {
                OC::$server->getConfig()::setAppValue('shorten', 'host', $_POST['host']);
        }
        if (isset($_POST['api'])) {
                OC::$server->getConfig()::setAppValue('shorten', 'api', $_POST['api']);
        }
        if (isset($_POST['type'])) {
                OC::$server->getConfig()::setAppValue('shorten', 'type', $_POST['type']);
        }
}
?>
