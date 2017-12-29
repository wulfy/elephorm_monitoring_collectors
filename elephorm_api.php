<?php
echo "running make install 3 ... ";

//display
echo shell_exec("cd ../elephorm/api && make -d install");
echo shell_exec('echo "$USER"');
