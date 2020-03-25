from lib.EquationSolution import EquationSolution
from sympy import *


class NetwonDownHillSolution(EquationSolution):
    def __init__(self, fn_str, solution_range, accurate_digits, debug):
        super().__init__(fn_str, solution_range, accurate_digits, debug)

        self._record_step(False, 'f(x) = %s, x ∈ %s' % (str(self._fn), str(solution_range)))

    '''
    as if it's always convergent...
    '''
    def _estimate_is_convergent(self):
        pass

    def run(self):
        self._record_step(False, 'Netwon Down-Hill Iteration: ')

        diff_fn = diff(self._fn, self._x)
        self._record_step(False, 'f\'(x) = %s' % diff_fn)

        x = self._x
        xn_1 = self._solution_range[0]
        xn = 0
        is_find_solution = False

        iteration_num = 1
        end_threshold = 10 ** -self._accurate_digits

        while iteration_num < self._max_iteration:
            fxn_1 = self._fn.evalf(subs={x: xn_1})
            xn = xn_1 - fxn_1 / diff_fn.evalf(subs={x: xn_1})
            yn = xn

            self._record_step(False, 'x%d = %s' % (iteration_num - 1, str(xn_1)))
            self._record_step(False, 'f(x%d) = %s' % (iteration_num - 1, str(fxn_1)))
            self._record_step(False, 'x%d = y%d = %s' % (iteration_num, iteration_num, str(xn)))

            if abs(xn - xn_1) < end_threshold:
                self._record_step(False, '|x%d - x%d| < %s, iteration break' %
                                  (iteration_num - 1, iteration_num, str(end_threshold)))
                is_find_solution = true
                break

            a = 1
            while abs(self._fn.evalf(subs={x: xn_1})) < abs(self._fn.evalf(subs={x: xn})):
                a *= 2
                factor = 1 / a
                xn = factor * yn + (1 - factor) * xn_1
                self._record_step(False, 'λ = 1/%d, x%d = %s' % (a, iteration_num, str(xn)))

            xn_1 = xn
            iteration_num += 1

        if is_find_solution:
            return self._output_success(xn)
        else:
            return self._output_error('Iterate more than %d times but no solution found!' % self._max_iteration)
