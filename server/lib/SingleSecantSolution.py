from lib.EquationSolution import EquationSolution
from sympy import *


class SingleSecantSolution(EquationSolution):
    def __init__(self, iteration_fn_str, solution_range, accurate_digits, debug):
        super().__init__(iteration_fn_str, solution_range, accurate_digits, debug)

        self._record_step(False, 'f(x) = %s, x ∈ %s' % (str(self._fn), str(solution_range)))

    def _multiply_larger_than_zero(self, a, b):
        return (a > 0 and b > 0) or (a < 0 and b < 0)

    '''
    this is a sufficient condition, so 'estimate'.
    '''
    def _estimate_is_convergent(self):
        x = self._x
        a, b = self._solution_range

        self._fa = fa = self._fn.evalf(subs={x: a})
        self._fb = fb = self._fn.evalf(subs={x: b})

        diff_fn = diff(self._fn, self._x)

        diff_a = diff_fn.evalf(subs={x: a})
        diff_b = diff_fn.evalf(subs={x: b})

        double_diff = diff(diff_fn, self._x)
        self._double_diff_a = double_diff_a = double_diff.evalf(subs={x: a})
        self._double_diff_b = double_diff_b = double_diff.evalf(subs={x: b})
        '''
        f(a)f(b) < 0
        f'(x) != 0 ~> f'(a)f'(b) > 0
        f''(a)f''(b) > 0
        f(a)f''(a) > 0 (x0 = a)
        x1*x0 < 0
        '''
        return \
            not self._multiply_larger_than_zero(fa, fb) \
            and self._multiply_larger_than_zero(diff_a, diff_b) \
            and self._multiply_larger_than_zero(double_diff_a, double_diff_b) \
            and (self._multiply_larger_than_zero(fa, double_diff_a)
                 or self._multiply_larger_than_zero(fb, double_diff_b)) \
            and fa != fb

    def run(self):
        self._record_step(False, 'Single Secant Iteration: ')
        self._output_convergence()

        x0 = self._solution_range[0]
        xn_1 = self._solution_range[0]
        if self._multiply_larger_than_zero(self._fa, self._double_diff_a):
            x0 = self._solution_range[0]
            xn_1 = self._solution_range[1]
        if self._multiply_larger_than_zero(self._fb, self._double_diff_b):
            x0 = self._solution_range[1]
            xn_1 = self._solution_range[0]

        x = self._x
        is_find_solution = False
        self._record_step(False, 'x0 = %s' % str(x0))
        self._record_step(False, 'x1 = %s' % str(xn_1))

        iteration_num = 2
        end_threshold = 10 ** -self._accurate_digits

        while iteration_num < self._max_iteration:
            xn = xn_1 - self._fn.evalf(subs={x: xn_1}) * (xn_1 - x0) / \
                 (self._fn.evalf(subs={x: xn_1}) - self._fn.evalf(subs={x: x0}))
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