const express = require("express");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const path = require("path");
const usersRoutes = require("./routes/users.js");
const pemesananRoutes = require("./routes/pemesanan_dan_detail_pemesanan.js");
const pengirimanRoutes = require("./routes/pengiriman.js");
const authRouter = require("./routes/auth.js");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", authRouter);

app.use("/users", usersRoutes);
app.use("/pemesanan", pemesananRoutes);
app.use("/pengiriman", pengirimanRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.use("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "SignIn.html"));
});

app.use("/orderdetail", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "detailpemesanan.html"));
});
app.use("/adminorderdetail", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admindetailpemesanan.html"));
});
app.use("/adminOrderHistory", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "pawAdmin","adminOrderHistory.html"));
});
app.use("/adminchekresi", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "pawAdmin","adminCheckResi.html"));
});

app.use("/adminWaitingconfirmation", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "pawAdmin","adminWaiting.html"));
});
app.use("/adminOrderCancelled", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "pawAdmin","adminCancel.html"));
});
app.use("/adminDeliveryProcess", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "pawAdmin","adminInProcessing.html"));
});
app.use("/userDeliveryProcess", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "pawUser","UserInProcessing.html"));
});
app.use("/UserInDelivery", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "pawUser","UserInDelivery.html"));
});
app.use("/userDeliveryclaim", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "pawUser","UserCompleted.html"));
});
app.use("/adminOnDelivery", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "pawAdmin","adminInDelivery.html"));
});
app.use("/adminInclaim", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "pawAdmin","adminInclaim.html"));
});

app.use("/contactafter", (req, res) => {
  res.sendFile(path.join(__dirname, "public","html", "contactAfter.html"));
});
app.use("/user-page", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user-page.html"));
});
app.use("/indexAfter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "indexAfter.html"));
});
app.use("/priceAfter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "priceAfter.html"));
});

app.use("/aboutAfter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "aboutAfter.html"));
});
app.use("/order", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "getMovingAfter.html"));
});
app.use("/ordernotlogin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "getMoving.html"));
});
app.use("/faqAfter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "faqAfter.html"));
});
app.use("/useMovingAfter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "useMovingAfter.html"));
});
app.use("/movefurryAfter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "movefurryAfter.html"));
});
app.use("/serviceCatAfter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "serviceCatAfter.html"));
});
app.use("/serviceDogAfter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "serviceDogAfter.html"));
});
app.use("/thankyouAfter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "thankyouAfter.html"));
});
app.use("/resicheck", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "resiCheck.html"));
});
app.use("/profile", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "html", "pawProfile", "profile.html")
  );
});
app.use("/profile_resetpassword", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "public",
      "html",
      "pawProfile",
      "profile_resetpassword.html"
    )
  );
});
app.use("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "signUp.html"));
});
app.use("/waitingforconfirmation", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "html", "pawUser", "UserWaiting.html")
  );
});
app.use("/orderhistory", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "html", "pawUser", "UserHistory.html")
  );
});
app.use("/statusinfo", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "html", "pawUser", "statusinfo.html")
  );
});
app.use("/ordercancelled", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "html", "pawUser", "UserCancel.html")
  );
});
app.use("/thankyou", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "thankyou.html"));
});
app.use("/serviceDog", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "serviceDog.html"));
});
app.use("/serviceCat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "serviceCat.html"));
});
app.use("/price", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "price.html"));
});
app.use("/movefurry", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "movefurry.html"));
});
app.use("/useMoving", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "useMoving.html"));
});
app.use("/forgot", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "Forgot.html"));
});
app.use("/faq", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "faq.html"));
});
app.use("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "contact.html"));
});
app.use("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "about.html"));
});

app.use((req, res, next) => {
  const error = new Error("Tidak ditemukan");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
