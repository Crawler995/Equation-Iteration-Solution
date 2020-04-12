from lib.EquationSolution import EquationSolution
from sympy import *


class NetwonSolution(EquationSolution):
    def __init__(self, fn_str, solution_range, accurate_digits, debug):
        super().__init__(fn_str, solution_range, accurate_digits, debug)
        self._diff_fn = diff(self._fn, self._x)
        self._record_step(False, 'f(x) = %s, x ∈ %s' % (str(self._fn), str(solution_range)))

    def _multiply_larger_than_zero(self, a, b):
        return (a > 0 and b > 0) or (a < 0 and b < 0)

    '''
    this is a sufficient condition, so 'estimate'.
    '''
    def _estimate_is_convergent(self):
        x = self._x
        a, b = self._solution_range

        fa = self._fn.evalf(subs={x: a})
        fb = self._fn.evalf(subs={x: b})

        diff_a = self._diff_fn.evalf(subs={x: a})
        diff_b = self._diff_fn.evalf(subs={x: b})

        double_diff = diff(self._diff_fn, self._x)
        double_diff_a = double_diff.evalf(subs={x: a})
        double_diff_b = double_diff.evalf(subs={x: b})

        self._record_step(False, 'a = %s, b = %s' % (str(a), str(b)))
        self._record_step(False, 'f(a) = %s, f(b) = %s' % (str(fa), str(fb)))
        self._record_step(False, 'f\'(a) = %s, f\'(b) = %s' % (str(diff_a), str(diff_b)))
        self._record_step(False, 'f\'\'(a) = %s, f\'\'(b) = %s' % (str(double_diff_a), str(double_diff_b)))
        '''
        f(a)f(b) < 0
        f'(x) != 0 ~> f'(a)f'(b) > 0
        f''(a)f''(b) > 0
        f(a)f''(a) > 0 (x0 = a)
        '''
        return \
            not self._multiply_larger_than_zero(fa, fb) \
            and self._multiply_larger_than_zero(diff_a, diff_b) \
            and self._multiply_larger_than_zero(double_diff_a, double_diff_b) \
            and self._multiply_larger_than_zero(fa, double_diff_a)

    def run(self):
        self._record_step(False, 'Netwon Iteration: ')
        self._record_step(False, 'f\'(x) = %s' % self._diff_fn)
        self._output_convergence()

        x = self._x
        xn_1 = self._solution_range[0]
        xn = 0
        is_find_solution = False
        self._record_step(False, 'x0 = %s' % str(xn_1))

        iteration_num = 1
        end_threshold = 10 ** -self._accurate_digits

        while iteration_num < self._max_iteration:
            xn = xn_1 - self._fn.evalf(subs={x: xn_1}) / self._diff_fn.evalf(subs={x: xn_1})
            self._record_step(False, 'x%d = %s' % (iteration_num, str(xn)))

            if abs(xn - xn_1) < end_threshold:
                self._record_step(False, '|x%d - x%d| < %s, iteration break' %
                                  (iteration_num - 1, iteration_num, str(end_threshold)))
                is_find_solution = true
                break

            xn_1 = xn
            iteration_num += 1

        if is_find_solution:
            return self._output_success(xn)
        else:
            return self._output_error('Iterate more than %d times but no solution found!' % self._max_iteration)
