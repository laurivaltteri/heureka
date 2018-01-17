#!/usr/bin/env python3
import sys
import numpy as np
import scipy.signal

from midas.node import BaseNode
from midas import utilities as mu


# EEG processing node
class EEGNode(BaseNode):

    def __init__(self, *args):
        """ Initialize EEG node. """
        super().__init__(*args)
        self.metric_functions.append(self.betapower)

    def betapower(self, x):
        """ Calculates beta power for input channel.
        """
        f, P = scipy.signal.welch(x['data'][0], fs=self.primary_sampling_rate)
        betapower = np.mean(P[np.bitwise_and(f >= 12.0, f <= 25.0)])

        return betapower

# Run the node from command line
if __name__ == '__main__':
    node = mu.midas_parse_config(EEGNode, sys.argv)
    if node:
        node.start()
        node.show_ui()
