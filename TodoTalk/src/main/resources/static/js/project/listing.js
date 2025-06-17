"use strict";

const KTAppEcommerceSalesListing = (() => {
  let table;
  let datatable;
  let flatpickr;
  let minDate, maxDate;

  const loadProjectData = () => {
    const tbody = document.querySelector('#kt_ecommerce_sales_table tbody');
    const sampleRow = tbody.querySelector('tr');

    fetch('/loadProjectData/list')
      .then(res => res.json())
      .then(data => {
        tbody.innerHTML = '';

        data.forEach((project, index) => {
          const clone = sampleRow.cloneNode(true);
          clone.style.display = '';

          // No 컬럼 번호
          clone.querySelector('[data-kt-ecommerce-order-filter="order_id"]').textContent = index + 1;

          // 프로젝트명
          const link = clone.querySelector('a.text-gray-800');
          link.textContent = project.projectName;
          link.href = `/project/detail/${project.projectId}`;

          // 상태 (한글로 표시, 코드 숨김 포함)
          const badge = clone.querySelector('.badge');
          const statusName = convertStatus(project.projectStatus);
          badge.textContent = statusName;
          badge.setAttribute('data-status-code', project.projectStatus);
          badge.innerHTML += `<span class="d-none">${project.projectStatus}</span>`; // 🔍 필터링용
		  
		  //담당자			  
		  clone.querySelectorAll('td')[3].querySelector('span').textContent = project.createdBy;
          // 날짜 (시작일, 종료일)
          clone.querySelectorAll('td')[4].querySelector('span').textContent = formatDate(project.projectStartDate);
          clone.querySelectorAll('td')[5].querySelector('span').textContent = formatDate(project.projectEndDate);

          tbody.appendChild(clone);
        });

        initDatatable();
      });
  };

  const convertStatus = (code) => {
    const map = {
      "01": "진행중",
      "02": "완료",
      "03": "지연",
      "04": "보류",
      "05": "상시"
    };
    return map[code] || code;
  };

  const formatDate = (datetimeStr) => {
    if (!datetimeStr) return '';
    const date = new Date(datetimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // → "2024-06-17"
  };


  const initDatatable = () => {
    datatable = $(table).DataTable({
      info: false,
      order: [],
      pageLength: 10,
      columnDefs: [
        { orderable: false, targets: 0 },
        { orderable: false, targets: 7 },
      ],
    });

    datatable.on('draw', () => {
      handleDeleteRows();
    });
  };

  const initFlatpickr = () => {
    const element = document.querySelector('#kt_ecommerce_sales_flatpickr');
    flatpickr = $(element).flatpickr({
      altInput: true,
	  altFormat: "Y/m/d",  // ← 사용자에게 보이는 형식
      dateFormat: "Y-m-d",       // ← 내부적으로 사용하는 형식
	  conjunction: " ~ ", 
      locale: "ko",              // ← 한글 설정 추가
	  mode: "range",
      onChange: (selectedDates, dateStr, instance) => {
        handleFlatpickr(selectedDates, dateStr, instance);
      },
    });
  };

  const handleSearchDatatable = () => {
    const filterSearch = document.querySelector('[data-kt-ecommerce-order-filter="search"]');
    filterSearch.addEventListener('keyup', (e) => {
      datatable.search(e.target.value).draw();
    });
  };

  const handleStatusFilter = () => {
    const filterStatus = document.querySelector('[data-kt-ecommerce-order-filter="status"]');
    $(filterStatus).on('change', (e) => {
      const value = e.target.value;
      datatable.column(2).search(value === 'all' || value === '' ? '' : value).draw();
    });
  };

  const handleFlatpickr = (selectedDates) => {
    minDate = selectedDates[0] ? new Date(selectedDates[0]) : null;
    maxDate = selectedDates[1] ? new Date(selectedDates[1]) : null;

    $.fn.dataTable.ext.search.push((settings, data) => {
      const dateAdded = new Date(moment($(data[5]).text(), 'DD/MM/YYYY'));
      const dateModified = new Date(moment($(data[6]).text(), 'DD/MM/YYYY'));

      return (
        (!minDate && !maxDate) ||
        (!minDate && maxDate >= dateModified) ||
        (minDate <= dateAdded && !maxDate) ||
        (minDate <= dateAdded && maxDate >= dateModified)
      );
    });

    datatable.draw();
  };

  const handleClearFlatpickr = () => {
    const clearButton = document.querySelector('#kt_ecommerce_sales_flatpickr_clear');
    clearButton.addEventListener('click', () => {
      flatpickr.clear();
    });
  };

  const handleDeleteRows = () => {
    const deleteButtons = table.querySelectorAll('[data-kt-ecommerce-order-filter="delete_row"]');

    deleteButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        const parent = e.target.closest('tr');
        const orderID = parent.querySelector('[data-kt-ecommerce-order-filter="order_id"]').innerText;

        Swal.fire({
          text: `Are you sure you want to delete order: ${orderID}?`,
          icon: "warning",
          showCancelButton: true,
          buttonsStyling: false,
          confirmButtonText: "Yes, delete!",
          cancelButtonText: "No, cancel",
          customClass: {
            confirmButton: "btn fw-bold btn-danger",
            cancelButton: "btn fw-bold btn-active-light-primary"
          }
        }).then((result) => {
          if (result.value) {
            Swal.fire({
              text: `You have deleted ${orderID}!.`,
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              }
            }).then(() => {
              datatable.row($(parent)).remove().draw();
            });
          } else if (result.dismiss === 'cancel') {
            Swal.fire({
              text: `${orderID} was not deleted.`,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              }
            });
          }
        });
      });
    });
  };

  return {
    init: () => {
      table = document.querySelector('#kt_ecommerce_sales_table');
      if (!table) return;

      loadProjectData();
      initFlatpickr();
      handleSearchDatatable();
      handleStatusFilter();
      handleDeleteRows();
      handleClearFlatpickr();
    }
  };
})();

KTUtil.onDOMContentLoaded(() => {
  KTAppEcommerceSalesListing.init();
});
