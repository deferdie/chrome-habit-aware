<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,

  props: ["domain", "domainProps"],

  data: () => {
    return {
      chartdata: {
        labels: [],
        datasets: [
          {
            label: "Visits",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },

        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },

  mounted() {
    const domainProps = this.domainProps;
    const formattedVisits = {};

    domainProps.visits.map((visit) => {
      let dateLabel = moment(visit).format("DD-MM-YYYY");
      if (formattedVisits[dateLabel] === undefined) {
        formattedVisits[dateLabel] = [visit];
      } else {
        formattedVisits[dateLabel].push(visit);
      }
    });

    Object.keys(formattedVisits).map((formattedVisit) => {
      this.chartdata.datasets[0].data.push(
        formattedVisits[formattedVisit].length
      );
    });

    this.chartdata.labels = Object.keys(formattedVisits);
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
labels.push(dateLabel);
