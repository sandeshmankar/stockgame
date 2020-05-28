<template>
  <div>
    <v-text-field
      label="Select Image"
      @click="pickFile"
      v-model="imageName"
      prepend-icon="attach_file"
    ></v-text-field>
    <input
      type="file"
      id="fileInput"
      style="display: none"
      ref="imageFile"
      accept="image/*"
      @change="ResizeImage"
    />

    <input type="button" value="Resize Image" hidden id="Submit" @click="ResizeImage" />
    <br />

    <!-- {{message}} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      message: "",
      imageName: ""
    };
  },

  methods: {
    pickFile() {
      this.$refs.imageFile.click();
    },
    ResizeImage() {
      const files = this.$refs.imageFile.files;
      console.log(files);
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }

        const fr = new FileReader();
        var img = document.createElement("img");
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          // this.imageFile = files[0] // this is an image file that can be sent to server...
          img.src = fr.result;

          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          var MAX_WIDTH = 250;
          var MAX_HEIGHT = 250;
          var width = img.width;
          var height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          let allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
          var dataurl = canvas.toDataURL(allowedTypes);

          if (dataurl == "data:,") {
            return;
          } else {
            // this.imageUrl = dataurl
            // this.$refs.output.src = dataurl;
            console.log(dataurl);
            // let res = await this.$axios.$post("/api/me/uploadImage?apikey=" + this.$store.state.auth_token, {
            //     image: dataurl
            // });
            // console.log(res)
          }
        });
      }
    }
  }
};
</script>
