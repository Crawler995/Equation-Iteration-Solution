from lib.AitkenSolution import AitkenSolution
from lib.DoubleSecantSolution import DoubleSecantSolution
from lib.NetwonDownHillSolution import NetwonDownHillSolution
from lib.NetwonSolution import NetwonSolution
from lib.SingleSecantSolution import SingleSecantSolution

AitkenSolution('E**(-x)', [0.5, 0.6], 5, True).run()
# NetwonSolution('x*E**x - 1', [0.5, 0.6], 5, True).run()
# NetwonDownHillSolution('x**3 - x - 1', [0.6, 1.5], 5, True).run()
# SingleSecantSolution('x*E**x - 1', [0.5, 0.6], 5, True).run()
# DoubleSecantSolution('x*E**x - 1', [0.5, 0.6], 5, True).run()
