from lib.EquationSolution import EquationSolution
from sympy import *


class AtikenSolution(EquationSolution):
    def __init__(self, iteration_fn_str, solution_range, accurate_digits, debug):
        super().__init__(iteration_fn_str, solution_range, accurate_digits, debug)

        self._record_step(False, 'φ(x) = %s, x ∈ %s' % (str(self._fn), str(solution_range)))

    def _estimate_is_convergent(self, iteration_fn):
        diff_fn = diff(iteration_fn, self._x)
        self._record_step(False, 'φ\'(x) = %s' % str(diff_fn))

        x = self._x
        start_value = diff_fn.evalf(subs={x: self._solution_range[0]})
        end_value = diff_fn.evalf(subs={x: self._solution_range[1]})
        self._record_step(False, 'φ\'(%s): %s' % (str(self._solution_range[0]), str(start_value)))
        self._record_step(False, 'φ\'(%s): %s' % (str(self._solution_range[1]), str(end_value)))

        return abs(start_value) < 1 and abs(end_value) < 1

    def run(self):
        self._record_step(False, 'Atiken Iteration: ')

        is_convergent = self._estimate_is_convergent(self._fn)
        if not is_convergent:
            error = 'estimated φ(x) is not convergent, cancel iteration'
            return self._output_error(error)

        self._record_step(False, 'estimated φ(x) is convergent, start iteration')

        x = self._x
        xn_1 = self._solution_range[0]
        is_find_solution = False
        self._record_step(False, 'x0 = %s' % str(xn_1))

        iteration_num = 1
        end_threshold = 10 ** -self._accurate_digits

        while iteration_num < self._max_iteration:
            yn = self._fn.evalf(subs={x: xn_1})
            self._record_step(False, 'y%d = %s' % (iteration_num, str(yn)))
            zn = self._fn.evalf(subs={x: yn})
            self._record_step(False, 'z%d = %s' % (iteration_num, str(zn)))

            if abs(yn - xn_1) < end_threshold and abs(zn - yn) < end_threshold:
                self._record_step(False,
                                  '|y%d - x%d| < %s and |z%d - y%d| < %s, iteration break' %
                                  (iteration_num, iteration_num - 1, str(end_threshold), iteration_num,
                                   iteration_num - 1, str(end_threshold)))
                is_find_solution = true
                break

            xn = (xn_1 * zn - yn * yn) / (xn_1 - 2 * yn + zn)
            self._record_step(False, 'x%d = %s' % (iteration_num, str(xn)))

            xn_1 = xn
            iteration_num += 1

        if is_find_solution:
            return self._output_success(xn_1)
        else:
            return self._output_error('Iterate more than %d times but no solution found!' % self._max_iteration)
