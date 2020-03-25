from lib.AitkenSolution import AitkenSolution
from lib.NetwonDownHillSolution import NetwonDownHillSolution
from lib.NetwonSolution import NetwonSolution
from lib.SingleSecantSolution import SingleSecantSolution
from lib.DoubleSecantSolution import DoubleSecantSolution


class SolutionFactory:
    def __init__(self, accurate_digits, debug=True):
        self._accurate_digits = accurate_digits
        self._debug = debug

    def create(self, iteration_method, fn_str, solution_range):
        if iteration_method == 'Aitken':
            return AitkenSolution(fn_str, solution_range, self._accurate_digits, self._debug)
        elif iteration_method == 'Netwon':
            return NetwonSolution(fn_str, solution_range, self._accurate_digits, self._debug)
        elif iteration_method == 'Netwon Down-Hill':
            return NetwonDownHillSolution(fn_str, solution_range, self._accurate_digits, self._debug)
        elif iteration_method == 'Single Secant':
            return SingleSecantSolution(fn_str, solution_range, self._accurate_digits, self._debug)
        elif iteration_method == 'Double Secant':
            return DoubleSecantSolution(fn_str, solution_range, self._accurate_digits, self._debug)
        else:
            return None
