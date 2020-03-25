from lib.EquationSolution import EquationSolution
from sympy import *


class NetwonSolution(EquationSolution):
    def __init__(self, fn_str, solution_range, accurate_digits, debug):
        super().__init__(fn_str, solution_range, accurate_digits, debug)

        self._record_step(False, 'f(x) = %s, x ∈ %s' % (str(self._fn), str(solution_range)))

    '''
    I think it's too hard to judge the convergence of Netwon Iteration for computer...
    '''
    def _estimate_is_convergent(self, iteration_fn):
        pass

    def run(self):
        self._record_step(False, 'Netwon Iteration: ')

        diff_fn = diff(self._fn, self._x)
        self._record_step(False, 'f\'(x) = %s' % diff_fn)

        x = self._x
        xn_1 = self._solution_range[0]
        is_find_solution = False
        self._record_step(False, 'x0 = %s' % str(xn_1))

        iteration_num = 1
        end_threshold = 10 ** -self._accurate_digits

        while iteration_num < self._max_iteration:
            xn = xn_1 - self._fn.evalf(subs={x: xn_1}) / diff_fn.evalf(subs={x: xn_1})
            self._record_step(False, 'x%d = %s' % (iteration_num, str(xn)))

            if abs(xn - xn_1) < end_threshold:
                self._record_step(False, '|x%d - x%d| < %s, iteration break' %
                                  (iteration_num - 1, iteration_num, str(end_threshold)))
                is_find_solution = true
                break

            xn_1 = xn
            iteration_num += 1

        if is_find_solution:
            return self._output_success(xn_1)
        else:
            return self._output_error('Iterate more than %d times but no solution found!' % self._max_iteration)
