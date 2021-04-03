<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data: () => {
    return {
      chartdata: {
        labels: ["January", "February"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  mounted() {
    console.log(chrome);
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
