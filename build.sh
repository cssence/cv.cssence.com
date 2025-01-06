#!/bin/bash
# 404.html
input=public/index.html
output=public/404.html
titleline=5
head -n $((titleline - 1)) $input > $output
echo '<title>Page not found</title>' >> $output
echo '<meta name="description" content="The requested page does not exist on cv.cssence.com.">' >> $output
echo '<meta name="robots" content="noindex,follow">' >> $output
tail -n +$((titleline + 2)) $input >> $output
