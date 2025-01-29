import { useState } from "react";
import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";
import { Camera, Phone, Calendar, Home, User, CheckCircle } from "lucide-react";
import { formatDate } from "../lib/utils";

const ProfileInfoPage = () => {
  const { user, updateProfile, updateCoverPhoto } = authStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedCoverImg, setSelectedCoverImg] = useState(null);
  const birthdayDate = user.birthday ? formatDate(user.birthday) : "N/A";

  const handleImageUpload = async (e, isCoverPhoto = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a JPEG or PNG image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;

      if (isCoverPhoto) {
        setSelectedCoverImg(base64Image);
        try {
          await updateCoverPhoto({ coverPhoto: base64Image });
        } catch (error) {
          console.error("Failed to upload cover photo:", error);
          alert("Failed to upload cover photo. Please try again.");
        }
      } else {
        setSelectedImg(base64Image);
        try {
          await updateProfile({ profilePicture: base64Image });
        } catch (error) {
          console.error("Failed to upload profile picture:", error);
          alert("Failed to upload profile picture. Please try again.");
        }
      }
    };
  };

  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 p-6">
        <div className="flex flex-col w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="relative h-60 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300">
            <img
              src={selectedCoverImg || user.coverPhoto || "/default-cover.jpg"}
              alt="Cover"
              className="w-full h-full object-cover rounded-t-xl"
            />
            <label
              htmlFor="cover-upload"
              className="absolute top-4 right-4 bg-gray-800 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center"
            >
              <Camera size={20} />
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, true)}
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row items-center p-8 gap-6 bg-gradient-to-br from-white to-gray-50">
            <div className="relative w-32 h-32">
              <img
                src={selectedImg || user.profilePicture || "/avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-lg"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-2 right-2 bg-blue-500 text-white p-3 rounded-full cursor-pointer shadow-md hover:bg-blue-400 transition duration-300 flex items-center justify-center"
              >
                <Camera size={20} />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, false)}
                />
              </label>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <h1 className="text-3xl font-bold font-poppins text-gray-800">
                  {user.fullName || "N/A"}
                </h1>
                <CheckCircle className="text-green-500 w-6 h-6 ml-2" />
              </div>
              <p className="text-gray-600 mt-2 font-poppins">
                {user.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 px-8 py-4">
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-6 shadow-md">
              <h1 className="font-poppins font-bold text-xl text-gray-800">
                Bio
              </h1>
              <p className="text-sm font-poppins text-gray-600 mt-2">
                {user.bio || "N/A"}
              </p>
            </div>
          </div>

          <div className="border-t p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 font-poppins">
              Profile Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Phone, label: user.contact || "N/A" },
                { icon: Home, label: user.address || "N/A" },
                { icon: User, label: user.age || "N/A" },
                { icon: Calendar, label: birthdayDate || "N/A" },
              ].map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <detail.icon className="w-6 h-6 text-blue-500 mr-3" />
                  <span className="text-gray-700">{detail.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 font-poppins">
              Career Information
            </h2>
            <div className="space-y-6 font-poppins">
              {[
                {
                  label: "Field of Work",
                  value: user.careerInformation?.fieldOfWork || "N/A",
                },
                {
                  label: "Skills",
                  value: user.careerInformation?.skills?.length ? (
                    <ul className="flex flex-wrap gap-4">
                      {user.careerInformation.skills.map((skill, index) => (
                        <li
                          key={index}
                          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  ),
                },
                {
                  label: "Education",
                  value: user.careerInformation?.education || "N/A",
                },
                {
                  label: "Work Experience",
                  value: user.careerInformation?.workExperience || "N/A",
                },
              ].map((info, index) => (
                <div key={index} className="flex">
                  <span className="font-medium w-48 text-gray-700">
                    {info.label}
                  </span>
                  <span className="text-gray-600"> : {info.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 font-poppins">
              PWD Information
            </h2>
            <div className="space-y-6 font-poppins">
              {[
                {
                  label: "Status",
                  value: user.disabilityInformation?.isIdVerified
                    ? "Verified"
                    : "Not Verified",
                },
                {
                  label: "Disability Type",
                  value: user.disabilityInformation?.disabilityType || "N/A",
                },
                {
                  label: "Accessibility Needs",
                  value:
                    user.disabilityInformation?.accessibilityNeeds || "N/A",
                },
              ].map((info, index) => (
                <div key={index} className="flex">
                  <span className="font-medium w-48 text-gray-700">
                    {info.label}
                  </span>
                  <span className="text-gray-600"> : {info.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileInfoPage;