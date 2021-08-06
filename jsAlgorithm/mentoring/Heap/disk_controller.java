package jsAlgorithm.mentoring.Heap;

import java.util.Comparator;
import java.util.PriorityQueue;

class Job {
    public int requestTime;
    public int jobLength;
    public Job(int requestTime, int jobLength) {
        this.requestTime = requestTime;
        this.jobLength = jobLength;
    }
}

public class disk_controller {
    public static int solution(int[][] jobs) {
        int N = jobs.length;
        PriorityQueue<Job> pq = new PriorityQueue<>(new Comparator<Job>() {
            @Override
            public int compare(Job o1, Job o2) {
                return o1.jobLength - o2.jobLength;
            }
        });
        for (int i = 0; i < N; i++) {
            pq.offer(new Job(jobs[i][0], jobs[i][1]));
        }
        int sum = 0;
        int time = 0;
        while (pq.size() > 0) {
            System.out.println("current time:" + time);
            Job next_job = pq.poll();
            if (time > next_job.requestTime)
                sum += (time - next_job.requestTime);
            sum += next_job.jobLength;
            System.out.println("waiting time:" + (time - next_job.requestTime));
            System.out.println("sum:" + sum);
            time += next_job.jobLength;
        }
        return sum / N;
    }

    public static void main(String[] args) {
        int[][] jobs = {{0, 3}, {0, 3}, {1, 9}, {2, 6}};
        System.out.println(solution(jobs));
    }
}
