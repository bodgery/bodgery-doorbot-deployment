#!/bin/bash
PIN=22
OPEN_TIME=30

gpio -g write ${PIN} 1
echo "Door is open for ${OPEN_TIME} seconds"
sleep ${OPEN_TIME}
gpio -g write ${PIN} 0
echo "Door is closed"
