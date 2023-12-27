import type {
  Reporter, FullConfig, Suite, TestCase, TestResult, FullResult, TestStep, Location
} from '@playwright/test/reporter';

class SlowStepReporter implements Reporter {
  private steps: Array<{ count: number, name: string, location: string | undefined, duration: number }> = [];

  onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
    if (step.category === 'test.step') {
      const stepToReport = {
        count: 1,
        name: step.titlePath().join('->'),
        location: `${step.location?.file}:${step.location?.line}`,
        duration: step.duration
      }
      const alreadyReported = this.steps.find(s => s.name === stepToReport.name);

      if (alreadyReported) {
        alreadyReported.count++
      } else {
        this.steps.push(stepToReport);
      }
    }
  }

  onEnd() {
    console.warn('TOP-10 slowest steps')
    console.table(
      // Slowest first
      this.steps.sort((a, b) => b.duration - a.duration)
      // TOP-10 slowest steps
      .slice(0, 10))
  }
}
export default SlowStepReporter;