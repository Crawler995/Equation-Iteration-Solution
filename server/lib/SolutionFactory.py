from lib.AtikenSolution import AtikenSolution
from lib.NetwonDownHillSolution import NetwonDownHillSolution
from lib.NetwonSolution import NetwonSolution


class SolutionFactory:
    def __init__(self, accurate_digits, debug=True):
        self._accurate_digits = accurate_digits
        self._debug = debug

    def create(self, iteration_method, fn_str, solution_range):
        if iteration_method == 'Aitken':
            return AtikenSolution(fn_str, solution_range, self._accurate_digits, self._debug)
        elif iteration_method == 'Netwon':
            return NetwonSolution(fn_str, solution_range, self._accurate_digits, self._debug)
        elif iteration_method == 'Netwon Down-Hill':
            return NetwonDownHillSolution(fn_str, solution_range, self._accurate_digits, self._debug)
        else:
            return None
