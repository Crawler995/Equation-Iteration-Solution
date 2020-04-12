from sympy import *
import logging


class EquationSolution:
    def __init__(self, fn_str, solution_range, accurate_digits, debug):
        self._solution_range = solution_range
        self._accurate_digits = accurate_digits
        self._max_iteration = 30

        logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
        self._logger = logging.getLogger(__name__)
        self._logger.disabled = not debug

        self._x = Symbol('x')
        x = self._x
        self._fn = eval(fn_str)

        self._steps = []

    def _estimate_is_convergent(self):
        pass

    def _output_convergence(self):
        is_convergent = self._estimate_is_convergent()
        if not is_convergent:
            self._record_step(True, 'estimated f(x) is not convergent, but try iterating')
        else:
            self._record_step(False, 'estimated f(x) is convergent, start iteration')

    def _record_step(self, is_failed, msg):
        self._logger.info(msg)
        self._steps.append({
            'is_failed': is_failed,
            'msg': msg
        })

    def run(self):
        pass

    def _output_success(self, solution):
        # solution = str(solution).split('.')[0] + '.' + str(solution).split('.')[1][0:self._accurate_digits]
        solution = format(solution, '.%df' % self._accurate_digits)
        self._record_step(False, 'the solution is %s (accurate to %d digits after decimal point)\n' %
                          (solution, self._accurate_digits))
        return float(solution), self._steps

    def _output_error(self, error):
        self._record_step(True, error + '\n')
        return None, self._steps
