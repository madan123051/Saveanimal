(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // dashboard/app.tsx
  var import_react = __require("react");
  var import_client = __require("react-dom/client");

  // dashboard/components/StatCard.tsx
  var import_jsx_runtime = __require("react/jsx-runtime");
  var StatCard = ({ title, value, icon, color }) => {
    const colorClass = { primary: "border-l-4 border-blue-500", secondary: "border-l-4 border-purple-500", accent: "border-l-4 border-pink-500", info: "border-l-4 border-cyan-500", success: "border-l-4 border-green-500", warning: "border-l-4 border-yellow-500", error: "border-l-4 border-red-500" }[color];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `bg-white rounded-lg shadow-sm p-4 flex flex-row items-center gap-4 ${colorClass} hover:shadow-md transition`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-4xl", children: icon }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-gray-500 font-semibold uppercase", children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-3xl font-bold text-gray-800", children: value })
      ] })
    ] });
  };

  // dashboard/components/AdminDashboard.tsx
  var import_jsx_runtime2 = __require("react/jsx-runtime");
  var AdminDashboard = ({ volunteers, activities, currentUser }) => {
    const totalHours = volunteers.reduce((sum, v) => sum + v.hours, 0);
    const completedActivities = activities.filter((a) => a.status === "Completed").length;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "p-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Admin Dashboard" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { title: "Total Volunteers", value: volunteers.length, icon: "\u{1F465}", color: "info" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { title: "Total Hours", value: totalHours, icon: "\u23F1\uFE0F", color: "success" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { title: "Completed Activities", value: completedActivities, icon: "\u2705", color: "warning" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { title: "Upcoming Activities", value: activities.filter((a) => a.status === "Upcoming").length, icon: "\u{1F4C5}", color: "primary" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-gray-700 text-lg mb-4", children: "Recent Volunteers" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-3", children: volunteers.slice(0, 3).map((v) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-semibold text-gray-800", children: v.name }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-sm text-gray-500", children: [
                v.hours,
                " hours \xB7 ",
                v.activities,
                " activities"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium", children: v.status })
          ] }, v.id)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-gray-700 text-lg mb-4", children: "Upcoming Activities" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-3", children: activities.filter((a) => a.status === "Upcoming").map((a) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-semibold text-gray-800", children: a.title }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-sm text-gray-500", children: [
                a.date,
                " \xB7 ",
                a.volunteers,
                " volunteers"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium", children: a.status })
          ] }, a.id)) })
        ] })
      ] })
    ] });
  };

  // dashboard/components/VolunteerDashboard.tsx
  var import_jsx_runtime3 = __require("react/jsx-runtime");
  var VolunteerDashboard = ({ user, activities }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Your Dashboard" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StatCard, { title: "Volunteer Hours", value: user.hours || 0, icon: "\u23F1\uFE0F", color: "success" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StatCard, { title: "Activities Joined", value: user.activities || 0, icon: "\u{1F3AF}", color: "info" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StatCard, { title: "Member Since", value: user.joinDate ? user.joinDate.split("-")[0] : "2024", icon: "\u{1F4C5}", color: "primary" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StatCard, { title: "Skills", value: user.skills?.length || 0, icon: "\u2B50", color: "warning" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "font-bold text-gray-700 text-lg mb-4", children: "Upcoming Activities" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "space-y-3", children: activities.filter((a) => a.status === "Upcoming").map((a) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex justify-between items-center p-4 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "font-semibold text-gray-800", children: a.title }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-sm text-gray-500", children: [
              a.date,
              " \xB7 ",
              a.volunteers,
              " volunteers needed"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-gray-600 mt-1", children: a.description })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: "ml-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition", children: "Join" })
        ] }, a.id)) })
      ] })
    ] });
  };

  // dashboard/components/VisitorHome.tsx
  var import_jsx_runtime4 = __require("react/jsx-runtime");
  var VisitorHome = ({ activities }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-3xl font-bold text-gray-800 mb-2", children: "Welcome to SaveAnimal NGO \u{1F43E}" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-gray-500", children: "Making a difference for animals, one action at a time" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-green-50 border border-green-200 rounded-xl p-5 mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "font-bold text-green-800 text-lg mb-2", children: "About Us" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-green-700", children: "We are dedicated to animal welfare and protection. Our volunteer community works tirelessly to rescue, rehabilitate, and rehome animals in need." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "text-xl font-bold text-gray-800 mb-4", children: "Our Activities" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: activities.map((a) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-between items-start mb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h4", { className: "font-bold text-gray-800", children: a.title }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${a.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`, children: a.status })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-sm text-gray-500 mb-2", children: [
          "\u{1F4C5} ",
          a.date
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-sm text-gray-600 mb-3", children: a.description }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-sm text-gray-500", children: [
          "\u{1F465} ",
          a.volunteers,
          " Volunteers"
        ] })
      ] }, a.id)) })
    ] });
  };

  // dashboard/components/ProfilePage.tsx
  var import_jsx_runtime5 = __require("react/jsx-runtime");
  var ProfilePage = ({ user, activities, onNavigate }) => {
    const isVolunteer = user.role === "volunteer";
    const isAdmin = user.role === "admin";
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h1", { className: "text-2xl font-bold text-gray-800 mb-6", children: "My Profile" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bg-white rounded-xl shadow-sm p-6 mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col md:flex-row gap-6 items-start md:items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0", children: user.name.charAt(0).toUpperCase() }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-start justify-between mb-2", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: "text-2xl font-bold text-gray-800", children: user.name }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: `inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${isAdmin ? "bg-blue-100 text-blue-700" : isVolunteer ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`, children: isAdmin ? "\u{1F468}\u200D\u{1F4BC} Admin" : isVolunteer ? "\u{1F91D} Volunteer" : "\u{1F441}\uFE0F Visitor" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 mt-4", children: [
            user.email && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-gray-400", children: "\u{1F4E7}" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-gray-400", children: "Email" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "font-medium text-gray-700", children: user.email })
              ] })
            ] }),
            user.phone && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-gray-400", children: "\u{1F4F1}" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-gray-400", children: "Phone" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "font-medium text-gray-700", children: user.phone })
              ] })
            ] }),
            user.joinDate && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-gray-400", children: "\u{1F4C5}" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-gray-400", children: "Member Since" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "font-medium text-gray-700", children: new Date(user.joinDate).toLocaleDateString() })
              ] })
            ] }),
            user.status && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-gray-400", children: "\u{1F3C5}" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-gray-400", children: "Status" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "font-medium text-green-600", children: user.status })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      isVolunteer && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-4 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-3xl font-bold text-green-600", children: user.hours || 0 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm text-gray-500 mt-1", children: "\u23F1\uFE0F Total Hours" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-4 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-3xl font-bold text-blue-600", children: user.activities || 0 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm text-gray-500 mt-1", children: "\u{1F3AF} Activities" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-4 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-3xl font-bold text-yellow-600", children: user.skills?.length || 0 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm text-gray-500 mt-1", children: "\u2B50 Skills" })
          ] })
        ] }),
        user.skills && user.skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-5 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "font-bold text-gray-700 mb-3", children: "Skills & Expertise" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex flex-wrap gap-2", children: user.skills.map((skill, idx) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium", children: [
            "\u2713 ",
            skill
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "font-bold text-gray-700 mb-4", children: "Recent Activities" }),
          activities.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "space-y-3", children: activities.slice(0, 5).map((activity) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3 bg-gray-50 rounded-lg flex justify-between items-start", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { className: "font-semibold text-gray-800", children: activity.title }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm text-gray-500 mt-1", children: activity.description }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-xs text-gray-400 mt-1", children: [
                "\u{1F4C5} ",
                activity.date
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: `ml-3 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${activity.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`, children: activity.status })
          ] }, activity.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-center text-gray-400 py-6", children: "No activities yet" })
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "font-bold text-gray-700 mb-4", children: "Admin Information" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-gray-400", children: "Admin ID" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "font-semibold text-gray-800", children: user.id })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-gray-400", children: "Role" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "font-semibold text-blue-600", children: "System Administrator" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700", children: "\u2713 Full access to all dashboard features and user management tools" })
        ] })
      ] }),
      !isVolunteer && !isAdmin && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "font-bold text-gray-700 mb-3", children: "Visitor Account" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-gray-500 mb-4", children: "You are browsing as a visitor. Join us as a volunteer to make a difference!" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition", onClick: () => window.location.href = "/", children: "\u{1F43E} Become a Volunteer" })
      ] })
    ] });
  };

  // dashboard/components/Sidebar.tsx
  var import_jsx_runtime6 = __require("react/jsx-runtime");
  var Sidebar = ({ isOpen, currentPage, onPageChange, userRole, onLogout }) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "aside",
    {
      className: `bg-gray-900 text-white flex flex-col transition-all duration-300 ${isOpen ? "w-56" : "w-0 overflow-hidden"}`,
      style: { minHeight: "calc(100vh - 56px)" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-4 flex items-center gap-2 border-b border-gray-700", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-2xl", children: "\u{1F43E}" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "font-bold text-lg", children: "SaveAnimal" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("nav", { className: "flex-1 p-3 space-y-1", children: [
          userRole === "admin" && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F3E0}", label: "Dashboard", active: currentPage === "dashboard", onClick: () => onPageChange("dashboard") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F464}", label: "My Profile", active: currentPage === "profile", onClick: () => onPageChange("profile") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F465}", label: "Volunteers", active: currentPage === "volunteers", onClick: () => onPageChange("volunteers") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F3AF}", label: "Activities", active: currentPage === "activities", onClick: () => onPageChange("activities") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F4CA}", label: "Reports", active: currentPage === "reports", onClick: () => onPageChange("reports") })
          ] }),
          userRole === "volunteer" && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F3E0}", label: "Dashboard", active: currentPage === "dashboard", onClick: () => onPageChange("dashboard") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F464}", label: "My Profile", active: currentPage === "profile", onClick: () => onPageChange("profile") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u23F1\uFE0F", label: "My Hours", active: currentPage === "hours", onClick: () => onPageChange("hours") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F3AF}", label: "Activities", active: currentPage === "activities", onClick: () => onPageChange("activities") })
          ] }),
          (userRole === "visitor" || userRole === "user") && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F3E0}", label: "Home", active: currentPage === "dashboard", onClick: () => onPageChange("dashboard") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F464}", label: "My Profile", active: currentPage === "profile", onClick: () => onPageChange("profile") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavItem, { icon: "\u{1F3AF}", label: "Events", active: currentPage === "activities", onClick: () => onPageChange("activities") })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "p-3 border-t border-gray-700", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { onClick: onLogout, className: "w-full py-2 px-3 rounded-lg text-sm text-red-400 hover:bg-red-900/30 transition flex items-center gap-2", children: "\u{1F6AA} Logout" }) })
      ]
    }
  );
  var NavItem = ({ icon, label, onClick, active }) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "button",
    {
      onClick,
      className: `w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 text-sm transition ${active ? "bg-green-600 text-white font-semibold" : "text-gray-300 hover:bg-gray-700"}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: label })
      ]
    }
  );

  // dashboard/components/Header.tsx
  var import_jsx_runtime7 = __require("react/jsx-runtime");
  var Header = ({ user, onLogout, onToggleSidebar }) => {
    const getRoleLabel = (role) => {
      switch (role) {
        case "admin":
          return "\u{1F468}\u200D\u{1F4BC} Admin";
        case "volunteer":
          return "\u{1F91D} Volunteer";
        case "visitor":
          return "\u{1F441}\uFE0F Visitor";
        default:
          return role;
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("header", { className: "bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-40", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { className: "p-2 rounded-lg hover:bg-gray-100 transition", onClick: onToggleSidebar, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { width: "24", height: "24", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("h2", { className: "text-xl font-bold text-gray-800", children: [
          "Welcome, ",
          user.name,
          "! \u{1F44B}"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700", children: getRoleLabel(user.role) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { onClick: onLogout, className: "px-3 py-1 rounded-lg text-sm text-red-600 hover:bg-red-50 transition font-medium", children: "Logout" })
      ] })
    ] });
  };

  // dashboard/app.tsx
  var import_jsx_runtime8 = __require("react/jsx-runtime");
  var App = () => {
    const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
    const [sessionChecked, setSessionChecked] = (0, import_react.useState)(false);
    const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(true);
    const [currentPage, setCurrentPage] = (0, import_react.useState)("dashboard");
    const [volunteers, setVolunteers] = (0, import_react.useState)([]);
    const [activities, setActivities] = (0, import_react.useState)([]);
    (0, import_react.useEffect)(() => {
      initializeDemoData();
      restoreUserSession();
    }, []);
    const restoreUserSession = () => {
      try {
        const saved = localStorage.getItem("saveanimal_user") || localStorage.getItem("saveanimal_currentUser");
        if (saved) {
          const u = JSON.parse(saved);
          const validRoles = ["admin", "volunteer", "visitor", "user"];
          if (u && u.id) {
            u.role = validRoles.includes(u.role) ? u.role : "user";
            setCurrentUser(u);
          }
        }
      } catch (_) {
      }
      setSessionChecked(true);
    };
    const initializeDemoData = () => {
      setVolunteers([
        { id: "V001", name: "Rahul Kumar", email: "rahul@saveanimal.com", phone: "9876543210", skills: ["Animal Care", "Education"], hours: 45, joinDate: "2024-01-15", status: "Active", activities: 5 },
        { id: "V002", name: "Priya Singh", email: "priya@saveanimal.com", phone: "9876543211", skills: ["Fundraising", "Social Media"], hours: 32, joinDate: "2024-02-20", status: "Active", activities: 3 },
        { id: "V003", name: "Amit Patel", email: "amit@saveanimal.com", phone: "9876543212", skills: ["Veterinary", "Animal Care"], hours: 68, joinDate: "2023-12-01", status: "Active", activities: 8 }
      ]);
      setActivities([
        { id: "A001", title: "Animal Shelter Cleanup", date: "2024-06-10", volunteers: 12, status: "Completed", description: "Weekly cleaning and maintenance at shelter" },
        { id: "A002", title: "Veterinary Camp", date: "2024-06-15", volunteers: 8, status: "Upcoming", description: "Free health checkup for street animals" },
        { id: "A003", title: "Awareness Program", date: "2024-06-20", volunteers: 15, status: "Upcoming", description: "School program on animal welfare" }
      ]);
    };
    const handleLogin = (role, id) => {
      const validRoles = ["admin", "volunteer", "visitor", "user"];
      const safeRole = validRoles.includes(role) ? role : "user";
      let userData;
      if (safeRole === "volunteer") {
        const vol = volunteers.find((v) => v.id === id);
        userData = vol ? { ...vol, role: "volunteer" } : { id, name: "Volunteer", role: "volunteer" };
      } else if (safeRole === "admin") {
        userData = { id: "ADMIN001", name: "Admin User", email: "admin@saveanimal.com", role: "admin" };
      } else {
        userData = { id: id || "GUEST001", name: "Guest User", role: safeRole };
      }
      try {
        localStorage.setItem("saveanimal_user", JSON.stringify(userData));
        localStorage.setItem("saveanimal_currentUser", JSON.stringify(userData));
      } catch (_) {
      }
      setCurrentUser(userData);
      setCurrentPage("dashboard");
    };
    const handleLogout = () => {
      try {
        localStorage.removeItem("saveanimal_user");
        localStorage.removeItem("saveanimal_currentUser");
      } catch (_) {
      }
      setCurrentUser(null);
      setCurrentPage("dashboard");
      window.location.replace("/login.html");
    };
    if (!sessionChecked) {
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#0f4c1f,#1a6b3a)",
        fontFamily: "Inter,sans-serif"
      }, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { style: { textAlign: "center", color: "white" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: { fontSize: 48, marginBottom: 16 }, children: "\u{1F43E}" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { style: { fontSize: 16, opacity: 0.9 }, children: "Loading\u2026" })
      ] }) });
    }
    if (!currentUser) {
      window.location.replace("/login.html");
      return null;
    }
    const renderContent = () => {
      if (currentPage === "profile")
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ProfilePage, { user: currentUser, activities, onNavigate: setCurrentPage });
      switch (currentUser.role) {
        case "admin":
          return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(AdminDashboard, { volunteers, activities, currentUser });
        case "volunteer":
          return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(VolunteerDashboard, { user: currentUser, activities });
        case "visitor":
        case "user":
        default:
          return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(VisitorHome, { activities });
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex flex-col min-h-screen bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Header, { user: currentUser, onLogout: handleLogout, sidebarOpen, onToggleSidebar: () => setSidebarOpen(!sidebarOpen) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex flex-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Sidebar, { isOpen: sidebarOpen, currentPage, onPageChange: setCurrentPage, userRole: currentUser.role, onLogout: handleLogout }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("main", { className: "flex-1 overflow-auto", children: renderContent() })
      ] })
    ] });
  };
  var rootEl = document.getElementById("root");
  if (rootEl) (0, import_client.createRoot)(rootEl).render(/* @__PURE__ */ (0, import_jsx_runtime8.jsx)(App, {}));
})();
