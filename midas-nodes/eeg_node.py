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
        self.metric_functions.append(self.fp1beta)
        self.metric_functions.append(self.fp2beta)

    def fp1beta(self, x):
        """ Calculates beta power for channel 1.
            Note: Function assumes the first channel is Fp1 and the second Fp2.
            Implementation based on:
                XXX
        """
        f, P = scipy.signal.welch(x['data'][0], fs=self.sampling_rate)
        p_fp1_beta = np.mean(P[np.bitwise_and(f >= 12.0, f <= 25.0)])

        return p_fp1_beta

    def fp2beta(self, x):
        """ Calculates beta power for channel 2.
            Note: Function assumes the first channel is Fp1 and the second Fp2.
            Implementation based on:
                XXX
        """
        f, P = scipy.signal.welch(x['data'][1], fs=self.sampling_rate)
        p_fp2_beta = np.mean(P[np.bitwise_and(f >= 12.0, f <= 25.0)])

        return p_fp2_beta

# Run the node from command line
if __name__ == '__main__':
    node = mu.midas_parse_config(EEGNode, sys.argv)
    if node:
        node.start()
        node.show_ui()
