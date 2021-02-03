#!/bin/bash
input=public/index.html
output=public/404.html
titleline=5
head -n $((titleline - 1)) $input > $output
echo '<title>404 — Page not found</title>' >> $output
echo '<meta name="description" content="On https://cv.cssence.com/, this page does not exist.">' >> $output
echo '<meta name="robots" content="noindex,follow">' >> $output
tail -n +$((titleline + 2)) $input >> $output
