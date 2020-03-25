from lib.AtikenSolution import AtikenSolution
from lib.NetwonDownHillSolution import NetwonDownHillSolution
from lib.NetwonSolution import NetwonSolution

AtikenSolution('exp(-x)', [0.5, 0.6], 5).run()
NetwonSolution('x*exp(x) - 1', [0.5, 0.6], 5).run()
NetwonDownHillSolution('x**3 - x - 1', [0.6, 1.5], 5).run()
