const formBlog = document.getElementById("form-blog");

const inputTitle = document.getElementById("title");
const inputContent = document.getElementById("content");
const inputCategory = document.getElementById("category");
const inputImage = document.getElementById("image-url");
const inputDate = document.getElementById("date");

const postBTN = document.getElementById("button-tambah");
const cancelBTN = document.getElementById("button-cancel");

const containerPost = document.querySelector("main");
const containerPostList = document.getElementById("post-list");
const containerPostDetail = document.getElementById("post-detail");
const containerPreview = document.getElementById("preview-image");

let editItem = null;

formBlog.addEventListener("submit", (e) => {
  const date = convertDate();
  e.preventDefault();

  if (
    inputTitle.value.trim() &&
    inputContent.value.trim() &&
    inputCategory.value.trim() &&
    inputDate.value
  ) {
    if (editItem === null) {
      const card = document.createElement("div");
      card.classList.add("card");
      const contentTrim = inputContent.value.trim();
      const content =
        contentTrim.length > 100
          ? contentTrim.substring(0, 100) + "..."
          : contentTrim;

      card.innerHTML = `
        <div class="thumbnail">
          <img
            class="image"
            width="100%"
            src="${inputImage.value.trim()}"
            alt="Gambar tidak ditemukan"
          />
          <div class="category categoryText">${inputCategory.value.trim()}</div>
        </div>
        <div class="content">
          <h2 style="margin-bottom: 12px" class="titleText">
            ${inputTitle.value.trim()}
          </h2>
          <p class="contentTeks" style="color: rgb(87, 87, 87)">
            ${content}
          </p>
          <p class="contentText hidden">${contentTrim}</p>
        </div>
        <div class="card-footer">
            <div>
              <p class="dateText">${date}</p>
            </div>
            <div class="actions">
              <button id="button-edit" class="btn-edit">Edit</button>
              <button id="button-delete" class="btn-delete">Delete</button>
            </div>
        </div>
        <div class="button-detail">
        <p class="detail-button" id="button-detail">Lihat blog selengkapnya</p>
        </div>
        `;

      containerPost.append(card);
      formBlog.reset();
      previewDone();

      const buttonEdit = card.querySelector(".btn-edit");
      const buttonDelete = card.querySelector(".btn-delete");
      const buttonDetail = card.querySelector(".detail-button");

      const imageSrc = card.querySelector(".image");
      const titleText = card.querySelector(".titleText");
      const contentText = card.querySelector(".contentText");
      const categoryText = card.querySelector(".categoryText");
      const dateText = card.querySelector(".dateText");

      cancelBTN.addEventListener("click", () => {
        formBlog.reset();
        editItem = null;
        previewDone();
        postBTN.value = "Tambah";
        cancelBTN.style.display = "none";
      });

      buttonEdit.addEventListener("click", () => {
        editItem = card;

        inputTitle.value = titleText.textContent.trim();
        inputImage.value = imageSrc.src.trim();
        inputContent.value = contentText.textContent.trim();
        inputCategory.value = categoryText.textContent.trim();

        postBTN.value = "Update";
        cancelBTN.style.display = "inline-block";

        containerPreview.innerHTML = `
    <p>Preview gambar:</p>
    <img width="200px" src="${inputImage.value}" alt="Gambar tidak ditemukan">
  `;

        console.log(imageSrc, titleText, contentText, categoryText, dateText);
      });

      buttonDelete.addEventListener("click", () => {
        if (confirm("apakah anda yakin ingin menghapus ?")) card.remove();
      });

      buttonDetail.addEventListener("click", () => {
        containerPostList.classList.add("hidden");
        containerPostDetail.classList.remove("hidden");

        containerPostDetail.innerHTML = `
        <main class="detail-container">
        <div class="button-back">
          <p>Kembali ke halaman utama</p>
        </div>
        <div  class="detail-thumbnail">
          <img
            src="${imageSrc.src}"
            alt="Thumbnail"
          />
          <div class="category">${categoryText.textContent}</div>
        </div>

        <div class="detail-content">
          <h2 class="detail-title">
            ${titleText.textContent}
          </h2>
          <p class="detail-meta">
            Diposting pada <span>${dateText.textContent}</span> oleh
            <strong>Rafi Andi</strong>
          </p>
          <p class="detail-text">
            ${contentText.textContent}
          </p>
        </div>
      </main> 
        `;

        const buttonBack = containerPostDetail.querySelector(".button-back");
        buttonBack.addEventListener("click", () => {
          containerPostList.classList.remove("hidden");
          containerPostDetail.classList.add("hidden");
        });
      });
    } else {
      const imageSrc = editItem.querySelector(".image");
      const titleText = editItem.querySelector(".titleText");
      const contentText = editItem.querySelector(".contentTeks");
      const contentTextHidden = editItem.querySelector(".contentText");
      const categoryText = editItem.querySelector(".categoryText");
      const dateText = editItem.querySelector(".dateText");

      const contentTrim = inputContent.value.trim();
      const content =
        contentTrim.length > 100
          ? contentTrim.substring(0, 100) + "..."
          : contentTrim;

      imageSrc.src = inputImage.value.trim();
      titleText.textContent = inputTitle.value.trim();
      contentText.textContent = content;
      contentTextHidden.textContent = inputContent.value.trim();
      categoryText.textContent = inputCategory.value.trim();
      dateText.textContent = date;
      formBlog.reset();

      postBTN.value = "Tambah";
      cancelBTN.style.display = "none";

      editItem = null;

      previewDone();
    }
  } else {
    alert("tidak boleh kosong");
  }
});

inputImage.addEventListener("change", () => {
  console.log(inputImage.value);

  containerPreview.innerHTML = `
    <p>Preview gambar:</p>
    <img width="200px" src="${inputImage.value}" alt="Gambar tidak ditemukan">`;
});

const previewDone = () => {
  containerPreview.innerHTML = `
    <p>Preview gambar:</p>
  `;
};

const convertDate = () => {
  const fullDate = new Date(inputDate.value);

  console.log(fullDate);

  const monthName = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = fullDate.getDate();
  let monthIndex = fullDate.getMonth();
  console.log(monthIndex);
  const month = monthName[monthIndex];
  const year = fullDate.getFullYear();

  const datePost = `${date} ${month} ${year}`;
  return datePost;
};
