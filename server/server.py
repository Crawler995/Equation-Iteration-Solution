from flask import Flask, request, jsonify
from lib.SolutionFactory import SolutionFactory

app = Flask(__name__)


@app.route('/api/submit', methods=['GET'])
def submit_equation_total_info():
    try:
        fn_str = str(request.args.get('fnStr'))
        iteration_method = str(request.args.get('iterationMethod'))
        accurate_digits = int(request.args.get('accurateDigits'))
        solution_range_start = float(request.args.get('solutionRangeStart'))
        solution_range_end = float(request.args.get('solutionRangeEnd'))
        solution_range = [solution_range_start, solution_range_end]

        solution_factory = SolutionFactory(accurate_digits, True)
        solution, steps = solution_factory.create(iteration_method, fn_str, solution_range).run()

        return jsonify({
            'code': 200,
            'data': {
                'solution': solution,
                'steps': steps
            }
        }), 200
    except Exception as e:
        return jsonify({
            'code': 500,
            'data': str(e)
        }), 500


if __name__ == '__main__':
    app.run(port=3001)
