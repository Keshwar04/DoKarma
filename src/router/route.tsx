/**
 * DoKarma Router Configuration
 *
 * This file defines the routing structure for the DoKarma application.
 * It uses React Router to handle navigation between different components.
 *
 * Key features:
 * - Lazy loading of components for improved performance
 * - Protected routes for authenticated users
 * - Nested routing for profile-related pages
 * - Fallback UI for loading states
 * - Handles authentication-related routes (login, signup, password reset)
 * - Includes a catch-all route for 404 errors
 */

import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import FallbackUI from "../components/utils/fallbackUI";
import PageNotFound from "@/pages/pageNotFound";
import ScrollToTop from "@/components/utils/scrollToTop";
import ProtectedRoute from "./protectedRoute";
import ContactUs from "@/pages/footer/contactUs";
// const OTP = lazy(() => import("@/pages/auth/otp"));
// const CreatePassword = lazy(() => import("@/pages/auth/createPassword"));
const ForgetPassowrd = lazy(() => import("@/pages/auth/forgot-password"));
const AuthGuard = lazy(() => import("@/components/auth/AuthGuard"));
const DonatePledgeMonthly = lazy(
  () => import("@/components/ui-components/donatePledgeMonthly")
);
const RouteValidator = lazy(() => import("@/components/utils/routeValidator"));
const OnboardingGaurd = lazy(
  () => import("@/components/utils/onboardingGaurd")
);
const PledgeMonthly = lazy(() => import("@/pages/pledgeMonthly"));
const Terms = lazy(() => import("@/pages/footer/terms"));
const Privacy = lazy(() => import("@/pages/footer/privacy"));
const Login = lazy(() => import("@/pages/auth/login"));
const Signup = lazy(() => import("@/pages/auth/signup"));
const Layout = lazy(() => import("@/pages/layout"));
// const CampaignHistory = lazy(
//   () => import("@/components/ui-components/profile/campaignHistory")
// );
const BlogDetails = lazy(() => import("@/pages/blogDetails"));
const FundRaiserDashboard = lazy(() => import("@/pages/fundRaiserDashboard"));
const NewCampaign = lazy(() => import("@/pages/newCampaign"));
const Donation = lazy(() => import("@/pages/donation"));
const Profile = lazy(() => import("@/pages/profile"));
const Settings = lazy(
  () => import("@/components/ui-components/profile/settings/settings")
);
const Donate = lazy(
  () => import("@/components/ui-components/profile/favourites/donate")
);
const Support = lazy(() => import("@/pages/support"));
const AllCampaigns = lazy(() => import("../components/utils/allCampaigns"));
const Payment = lazy(() => import("@/pages/payment"));

const Routers = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<FallbackUI />}>
        <Routes>
          <Route
            path="login"
            element={
              <AuthGuard>
                <Login />
              </AuthGuard>
            }
          />

          <Route
            path="signup"
            element={
              <AuthGuard>
                <Signup />
              </AuthGuard>
            }
          />

          <Route
            path="forgot-password"
            element={
              <AuthGuard>
                <ForgetPassowrd />
              </AuthGuard>
            }
          />

          {/* <Route path="otp" element={<OTP />} /> */}
          {/* <Route path="create-password" element={<CreatePassword />} /> */}
          <Route path="/" element={<Layout />}>
            <Route index element={<RouteValidator />} />
            <Route path="onboarding" element={<OnboardingGaurd />} />
            <Route path="support-causes/:id" element={<PledgeMonthly />} />
            <Route
              path="support-causes/donate/:id"
              element={<DonatePledgeMonthly />}
            />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms-and-conditions" element={<Terms />} />
            <Route path="contact-us" element={<ContactUs />} />
            {/* </Route> */}
            <Route path="support" element={<Support />} />
            <Route path="blogs/:id" element={<BlogDetails />} />
            <Route path="donate" element={<Outlet />}>
              <Route index element={<Donate />} />
              <Route path="payment/:campaign_name" element={<Payment />} />
            </Route>
            <Route path="donation/:campaign_name" element={<Donation />} />
            <Route element={<ProtectedRoute />}>
              <Route path="fundraiser-dashboard" element={<Outlet />}>
                <Route index element={<FundRaiserDashboard />} />
                <Route path="all-campaigns" element={<AllCampaigns />} />
                <Route path="donation/:campaign_name" element={<Donation />} />
              </Route>
              <Route path="new-campaign" element={<NewCampaign />} />
              <Route path="profile" element={<Profile />}>
                <Route index element={<Settings />} />
                {/* <Route path="favourites" element={<Outlet />}></Route>
                <Route path="notifications" element={<CampaignHistory />} /> */}
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
