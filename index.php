<?php

libxml_use_internal_errors(true);
$doc = new DOMDocument();
$doc->loadHTMLFile("login.html");
echo $doc->saveHTML();
libxml_use_internal_errors(false);
