<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,

  props: ["domain", "domainProps"],

  data: () => {
    return {
      chartdata: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    };
  },

  mounted() {
    const domainProps = this.domainProps;
    console.log(domainProps);
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
      this.chartdata.datasets.push({
        label: formattedVisit,
        backgroundColor: "#f87979",
        data: [formattedVisits[formattedVisit].length],
      });
    });

    this.chartdata.labels = Object.keys(formattedVisits);
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
labels.push(dateLabel);
