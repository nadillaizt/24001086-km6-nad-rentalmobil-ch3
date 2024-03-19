
function numberToRupiah(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  $(document).ready(function () {
    $("#tanggal").attr("min", new Date().toISOString().split("T")[0]);
    $("input, select").change(function () {
      if (
        $("#tipe-drive").val() !== "Pilih Tipe Driver" &&
        $("#tanggal").val() !== "" &&
        $("#waktu").val() !== "Pilih Waktu"
      ) {
        $("#btn-cari").prop("disabled", false);
      } else {
        $("#btn-cari").prop("disabled", true);
      }
    });
    $("#btn-cari").click(function () {
      $.ajax({
        url: "data/cars.json",
        type: "GET",
        success: function (result) {
          const penumpang = $("#penumpang").val();
          $("#mobil").removeClass("d-none");
          $("#cars").empty();
          if (penumpang !== "") {
            result = result.filter((car) => car.capacity >= penumpang);
          }
          result.forEach((car) => {
            $("#cars").append(
              `<div class="col-12 col-lg-4 h-100">
                <div class="card">
                  <img src="assets/${
                    car.image
                  }" class="card-img-top" height="200px" />
                  <div class="card-body">
                    <p class="card-subtitle">${car.manufacture} - ${
                car.model
              }</p>
                    <h5 class="card-title">Rp ${numberToRupiah(
                      car.rentPerDay
                    )} / hari</h5>
                    <p class="card-text" style="flex-grow: 1;">${
                      car.description
                    }</p>
                    <div class="d-flex flex-column">
                      <p class="card-text"><i class="fas fa-users"></i> ${
                        car.capacity
                      } Orang</p>
                      <p class="card-text"><i class="fas fa-tachometer-alt"></i> ${
                        car.transmission
                      }</p>
                      <p class="card-text"><i class="fas fa-calendar-alt"></i> Tahun ${
                        car.year
                      }</p>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button class="btn btn-success w-100">Pilih Mobil</button>
                  </div>
                </div>
              </div>`
            );
          });
        $("html, body").scrollTop($("#mobil").offset().top - 100);
        },
      });
    });
  });