from lib.EquationSolution import EquationSolution
from sympy import *


class DoubleSecantSolution(EquationSolution):
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

        self._record_step(False, 'a = %s, b = %s' % (str(a), str(b)))
        self._record_step(False, 'f(a) = %s, f(b) = %s' % (str(self._fa), str(self._fb)))
        self._record_step(False, 'f\'(a) = %s, f\'(b) = %s' % (str(diff_a), str(diff_b)))

        '''
        f(a)f(b) < 0
        f'(x) != 0 ~> f'(a)f'(b) > 0
        '''
        return \
            not self._multiply_larger_than_zero(fa, fb) \
            and self._multiply_larger_than_zero(diff_a, diff_b)

    def run(self):
        self._record_step(False, 'Double Secant Iteration: ')
        self._output_convergence()

        x = self._x
        xn_1 = self._solution_range[0]
        xn = self._solution_range[1]
        is_find_solution = False
        self._record_step(False, 'x0 = %s' % str(xn_1))
        self._record_step(False, 'x1 = %s' % str(xn))

        iteration_num = 2
        end_threshold = 10 ** -self._accurate_digits

        while iteration_num < self._max_iteration:
            fn = self._fn.evalf(subs={x: xn})
            fn_1 = self._fn.evalf(subs={x: xn_1})
            xnp1 = (xn_1 * fn - xn * fn_1) / (fn - fn_1)
            self._record_step(False, 'x%d = %s' % (iteration_num, str(xnp1)))

            if abs(xnp1 - xn) < end_threshold:
                self._record_step(False, '|x%d - x%d| < %s, iteration break' %
                                  (iteration_num - 1, iteration_num, str(end_threshold)))
                is_find_solution = true
                break

            xn_1 = xn
            xn = xnp1
            iteration_num += 1

        if is_find_solution:
            return self._output_success(xn)
        else:
            return self._output_error('Iterate more than %d times but no solution found!' % self._max_iteration)