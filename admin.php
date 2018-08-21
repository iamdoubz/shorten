<?php

OCP\User::checkAdminUser();

$tmpl = new OCP\Template('shorten', 'admin');
$tmpl->assign('type', OC::$server->getConfig()->getAppValue('shorten', 'type', ''));
$tmpl->assign('host', OC::$server->getConfig()->getAppValue('shorten', 'host', ''));
$tmpl->assign('api', OC::$server->getConfig()->getAppValue('shorten', 'api', ''));

return $tmpl -> fetchPage();
