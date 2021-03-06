#!/bin/bash
# Script for setting up MIDAS network for FAROS data stream

#gnome-terminal -e "faros --stream --mac EC:FE:7E:16:34:00"
gnome-terminal -e "faros --stream --mac EC:FE:7E:16:2C:AB"
gnome-terminal -e "python eeg_node.py config_eeg.ini eeg"
gnome-terminal -e "midas-dispatcher config_eeg.ini dispatcher"
sleep 10
http localhost:8080/status/metrics
