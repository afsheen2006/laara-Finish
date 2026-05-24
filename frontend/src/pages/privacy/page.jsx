import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

import { getNavLinks, getSystemConfig } from "@/lib/cms-helpers";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import { useState, useEffect } from "react";

export default function PrivacyPage() {
  const [navLinks, setNavLinks] = useState([]);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getNavLinks(),
      getSystemConfig()
    ]).then(([navLinksData, configData]) => {
      setNavLinks(navLinksData || []);
      setConfig(configData || {});
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-medium">Loading Privacy Policy...</div>;
  }
  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [/*#__PURE__*/
      _jsx(Navigation, { customLinks: navLinks, config: config }), /*#__PURE__*/
      _jsxs("div", { className: "pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto", children: [/*#__PURE__*/

        _jsxs("div", { className: "flex flex-col mb-16 border-b border-white/10 pb-12", children: [/*#__PURE__*/
          _jsx("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 w-fit", children: /*#__PURE__*/
            _jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-primary", children: "Official Policy" }) }
          ), /*#__PURE__*/
          _jsxs("h1", { className: "text-4xl lg:text-6xl font-black tracking-tighter text-white mb-4", children: ["Laara Innovations ", /*#__PURE__*/
            _jsx("span", { className: "text-primary", children: "Privacy Statement" })] }
          ), /*#__PURE__*/
          _jsx("p", { className: "text-sm text-gray-500 font-medium tracking-widest uppercase italic", children: "Effective as of May 20, 2026" }

          )] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "space-y-16 text-gray-400 font-normal leading-relaxed", children: [/*#__PURE__*/

          _jsx("section", { className: "prose prose-invert max-w-none", children: /*#__PURE__*/
            _jsx("p", { className: "text-lg text-white/90 leading-relaxed italic border-l-2 border-primary pl-6", children: "Laara Innovations's mission is to enable anyone in an organization to quickly uncover insights hidden in their data, and make fact-based decisions, leading to a more data-driven culture. This mission is underpinned by our commitment to be transparent about the data we collect about you, how we use that data, and with whom it is shared." }

            ) }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "Processing Activities Covered" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: [/*#__PURE__*/
              _jsx("p", { children: "This Privacy Statement describes how we collect, use, share or otherwise process information relating to individuals (\u201CPersonal Data\u201D) and the rights that may be associated with that processing of Personal Data collected by us when you:" }), /*#__PURE__*/
              _jsxs("ul", { children: [/*#__PURE__*/
                _jsx("li", { children: "Visit our websites that display or link to this Privacy Statement (\u201CWebsite\u201D);" }), /*#__PURE__*/
                _jsx("li", { children: "Visit our offices;" }), /*#__PURE__*/
                _jsx("li", { children: "Visit our branded social media pages;" }), /*#__PURE__*/
                _jsx("li", { children: "Receive communications or otherwise communicate with us such as through emails, phone calls, texts, messaging platforms, or faxes;" }), /*#__PURE__*/
                _jsx("li", { children: "Use our software-as-a-service and software products (\u201CProducts\u201D) and related support and consulting services (\u201CServices\u201D) where we act as a controller of your Personal Data;" }), /*#__PURE__*/
                _jsx("li", { children: "Register for, attend, or participate in our events, webinars, programs, or trainings (\u201CEvents\u201D);" }), /*#__PURE__*/
                _jsx("li", { children: "Are employed by a customer of our Products and Services where your information has been shared with us in our capacity as a controller (for example, during the contracting process);" }), /*#__PURE__*/
                _jsx("li", { children: "Participate in the Laara Innovations Community site focused on exchanging ideas and best practices, and collaborating with other customers, partners, and Laara Innovations employees; or" }), /*#__PURE__*/
                _jsx("li", { children: "Participate in surveys, research, or other similar data collection facilitated by us." })] }
              ), /*#__PURE__*/
              _jsx("p", { children: "In some circumstances, we collect, or our partners provide us with, publicly available information that may contain Personal Data that you have published or that has been made available online. The way in which our partners collect this is detailed in their own privacy policies, available on their websites." }), /*#__PURE__*/
              _jsx("p", { children: "This Privacy Statement does not apply to third-party products, services, or businesses subject to separate terms, agreements, or privacy disclosures, or that are otherwise not offered under Laara Innovations's express agreements, regardless of whether they integrate with or interact with our Products (e.g., a Customer's on-site repository, cloud data warehouse, or a connected platform) (\u201CThird-Party Services\u201D). Product delivery, access, and use will be governed by separate terms signed between us and each Customer, under which the Customer will control its deployment of our Product and any data hosted therein. If you have any questions about specific Product settings or privacy practices, please contact the administrator assigned to that role in the related Product." })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "Definitions" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 space-y-6", children: [/*#__PURE__*/
              _jsx("p", { children: "For the purposes of this Privacy Statement:" }), /*#__PURE__*/
              _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h4", { className: "text-primary font-bold mb-1", children: "\u201CAuthorized User\u201D" }), /*#__PURE__*/
                  _jsx("p", { className: "text-sm", children: "Means an individual who was provided access credentials to access and use the Product by Customer, or otherwise using Customer's account." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h4", { className: "text-primary font-bold mb-1", children: "\u201CCustomer\u201D" }), /*#__PURE__*/
                  _jsx("p", { className: "text-sm", children: "Means the entity that purchases our Product or Services, or if a Product is offered for free, the entity or individual that is subject to the applicable terms of use." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h4", { className: "text-primary font-bold mb-1", children: "\u201CMobile Applications\u201D" }), /*#__PURE__*/
                  _jsx("p", { className: "text-sm", children: "Means our applications you have downloaded to a mobile device." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h4", { className: "text-primary font-bold mb-1", children: "\u201CPartner\u201D" }), /*#__PURE__*/
                  _jsx("p", { className: "text-sm", children: "Means an entity that is a participant in a Laara Innovations channel sales, technology, or other program to offer Laara Innovations Products and Services for sale, or provide services, or technology to Laara Innovations Customers." })] }
                )] }
              ), /*#__PURE__*/
              _jsx("p", { className: "text-sm italic", children: "This Privacy Statement is meant to help you understand what information we collect, why we collect it, and how you can exercise certain rights with respect to your Personal Data. If you have any questions about our use of your Personal Data, please contact us using the contact details provided at the bottom of this Privacy Statement and we will respond accordingly." })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "What Personal Data We Collect" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: [/*#__PURE__*/
              _jsx("p", { children: "The types of Personal Data we collect depend upon your interactions with us. We may collect information directly from you when you visit our Websites, attend our Events, or purchase or use our Products and Services. We may also collect information from trusted third-party sources and may engage select third-parties to collect Personal Data to assist us in operating our business. The types of information we collect from you may include the following:" }), /*#__PURE__*/

              _jsxs("div", { className: "space-y-8 mt-8", children: [/*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Contact Information and Personal Details" }), /*#__PURE__*/
                  _jsx("p", { children: "Authorized User credentials, full name, employer, job title and related employment information, email address, physical address, phone number, and other information such as your voice if you contact us by phone. We process your Personal Data, including recording phone calls (in accordance with applicable laws) for training, quality assurance, uncovering customer insights, and administration purposes. If required under applicable law, we will give you the option to object to a call being recorded." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Authorized User Profiles" }), /*#__PURE__*/
                  _jsx("p", { children: "For some Products (e.g., Laara Innovations Mode), we may enable Authorized Users to create profiles. This may include a photo of you, a short bio, links to your presence on social media sites, and other information you choose to include about yourself. The information you submit for display in your profile, including any Personal Data, may be viewable by other Authorized Users of Laara Innovations Mode based on the type and configuration of your account." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Payment, Billing, and Shipping Information" }), /*#__PURE__*/
                  _jsx("p", { children: "Financial information in connection with billing including, without limitation, billing, and shipping address." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Demographic Information" }), /*#__PURE__*/
                  _jsx("p", { children: "On rare occasions, we may collect demographic information, such as gender, race, ethnicity, or veteran status. Where Personal Data is deemed \u201Csensitive\u201D under applicable data privacy laws, we will only process it with your consent unless a recognized exception applies." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Event Information" }), /*#__PURE__*/
                  _jsx("p", { children: "Information related to your attendance at Events, including travel details and contact information, scheduling information, food preferences or allergies and accessibility requests, clothing sizes, and session ratings or other feedback." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Online Identifiers and Interactions" }), /*#__PURE__*/
                  _jsx("p", { children: "Device and user identifiers, Internet protocol address or location data when you access the Website, Products, or Mobile Applications and related user actions." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Device Information" }), /*#__PURE__*/
                  _jsx("p", { children: "Information relating to settings, attributes, identifiers, and interactions when you access the Website, Products, or Mobile Applications." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Search Query Data and Feedback" }), /*#__PURE__*/
                  _jsx("p", { children: "The search text submitted by Authorized Users of the Products when using our natural language processing functionality and user submitted feedback." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Predictive Search Setup" }), /*#__PURE__*/
                  _jsx("p", { children: "Upon purchase and subject to Customer selection, a Customer may choose to store limited, selected information via search suggestion indexing and search cache features provided in the Products." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Mode Uploaded Content" }), /*#__PURE__*/
                  _jsx("p", { children: "For Authorized Users of Laara Innovations Mode, you may upload data to the platform or post various queries, comments, analyses, and other content. If you choose to post Your Content in Mode's public function, Your Content is deemed a contribution to the community, and Mode will treat such information as public information." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Products Operations Data and Usage Data" }), /*#__PURE__*/
                  _jsx("p", { children: "Information from our software or systems comprising our Products and from Customer systems, applications, and devices that are used to access the Products." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Authentication and Access Information" }), /*#__PURE__*/
                  _jsx("p", { children: "Information that provides access to the Products, such as username, passwords, and device identifiers. In addition, the Personal Data we collect to provide our Products may include location information from third parties." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Diagnostic Information" }), /*#__PURE__*/
                  _jsx("p", { children: "Diagnostic information may be contained in log files, event files, and other trace and diagnostic files, which helps us to provide support and maintain the integrity of the Products and Services." })] }
                ), /*#__PURE__*/
                _jsxs("div", { children: [/*#__PURE__*/
                  _jsx("h3", { className: "text-white text-lg font-bold", children: "Third-Party Services Information" }), /*#__PURE__*/
                  _jsx("p", { children: "A Customer can choose to permit or restrict Third-Party Services for its Product(s) and Laara Innovations can receive Personal Data from such Third-Party Services." })] }
                )] }
              )] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "Third Party Services" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: [/*#__PURE__*/
              _jsx("p", { children: "Please note, Third-Party Services are typically software that integrate with our Product, and a Customer can permit its Authorized Users to enable and disable these integrations. Laara Innovations may also develop and offer extensions that connect the Products with a Third-Party Service. Once enabled, the provider of a Third-Party Service may share certain information with Laara Innovations." }), /*#__PURE__*/
              _jsx("p", { children: "Customers should check the privacy settings and notices in these Third-Party Services to understand what data may be disclosed to Laara Innovations. When a Third-Party Service is enabled, Laara Innovations is authorized to connect and access the information made available to Laara Innovations in accordance with our agreement with the provider of the Third-Party Service." })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "How We Use Your Personal Data" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: [/*#__PURE__*/
              _jsx("p", { children: "We may use your Personal Data for the purposes of operating our business, delivering, improving, and customizing our Websites, Products and Services, selling our Products and Services, sending marketing and other communications related to our business, and for other legitimate purposes permitted by applicable law. Some ways we may use Personal Data include:" }), /*#__PURE__*/
              _jsxs("ul", { children: [/*#__PURE__*/
                _jsx("li", { children: "To understand your preferences so we may enhance your experience;" }), /*#__PURE__*/
                _jsx("li", { children: "To send our Customers and Partners Laara Innovations-related information, confirmations, and security alerts;" }), /*#__PURE__*/
                _jsx("li", { children: "To communicate with you about promotions, upcoming events, or marketing purposes;" }), /*#__PURE__*/
                _jsx("li", { children: "To help understand your needs by linking or combining information about you with other Personal Data we get from third-parties;" }), /*#__PURE__*/
                _jsx("li", { children: "To enforce our terms and conditions or protect our business;" }), /*#__PURE__*/
                _jsx("li", { children: "To operate, maintain, and provide the features and functionality of the Website;" }), /*#__PURE__*/
                _jsx("li", { children: "To register you for Events you sign up for and populate profiles;" }), /*#__PURE__*/
                _jsx("li", { children: "For reward or prize fulfillment to participants in promotional events;" }), /*#__PURE__*/
                _jsx("li", { children: "For industry analysis, benchmarking, analytics, and marketing purposes;" }), /*#__PURE__*/
                _jsx("li", { children: "For billing and contracting purposes;" }), /*#__PURE__*/
                _jsx("li", { children: "To make recommendations to customers regarding their use of the Products;" }), /*#__PURE__*/
                _jsx("li", { children: "To improve the Products and Services;" }), /*#__PURE__*/
                _jsx("li", { children: "For tracking entitlements, providing support, monitoring, and ensuring performance;" }), /*#__PURE__*/
                _jsx("li", { children: "To comply with legal obligations and operate our business." })] }
              ), /*#__PURE__*/
              _jsx("p", { children: "If you are from the European Economic Area (\u201CEEA\u201D), our legal basis for collecting and using the Personal Data described above will depend on the Personal Data concerned and the specific context in which we collect it." })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "How We Share Your Personal Data" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: [/*#__PURE__*/
              _jsx("p", { children: "We may share your Personal Data with third-parties for the purposes of operating our business, selling, delivering, and improving our Products and Services, or otherwise with your consent." }), /*#__PURE__*/
              _jsxs("ul", { children: [/*#__PURE__*/
                _jsx("li", { children: "Within Laara Innovations, Inc. and any of our global subsidiaries;" }), /*#__PURE__*/
                _jsx("li", { children: "With third-party vendors, contractors, consultants, and other service providers that perform services on our behalf;" }), /*#__PURE__*/
                _jsx("li", { children: "With third-party vendors who assist with reward or prize delivery;" }), /*#__PURE__*/
                _jsx("li", { children: "In connection with, or during negotiations of, any merger, sale of company assets, or acquisition;" }), /*#__PURE__*/
                _jsx("li", { children: "In response to a request for information by a competent authority;" }), /*#__PURE__*/
                _jsx("li", { children: "With law enforcement officials as necessary to comply with legal process;" }), /*#__PURE__*/
                _jsx("li", { children: "In aggregated, anonymized, or de-identified form." })] }
              ), /*#__PURE__*/
              _jsx("p", { children: "We do not sell Personal Data nor do we rent or trade Personal Data collected through the Website with third-parties for their promotional purposes." }), /*#__PURE__*/
              _jsxs("p", { children: [/*#__PURE__*/_jsx("strong", { children: "Google API data" }), " - Use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements. Google Workspace APIs are not used to develop, improve, or train generalized AI and/or ML models."] })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "Mobile Applications" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: [/*#__PURE__*/
              _jsx("p", { children: "We may obtain additional information through Mobile Applications that you download to your mobile device (\u201CDevice\u201D). Our Mobile Applications may obtain, collect, or access information from your Device in connection with your use of the Products, and are designed to interoperate with the Products." }), /*#__PURE__*/
              _jsx("p", { children: "To provide and operate the Mobile Applications, we need certain information from you, such as login credentials. We may also collect Device event information, such as error logs and crashes, which allows us to improve our Mobile Application for a better user experience." })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "How We Secure Your Personal Data" }) }
            ), /*#__PURE__*/
            _jsx("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: /*#__PURE__*/
              _jsx("p", { children: "We implement physical, administrative, and technical safeguards designed to protect your Personal Data from unauthorized access, use, or disclosure. We also contractually require that our service providers protect such information. In addition, we limit access to Personal Data to those employees, agents, contractors, and other third-parties that have a legitimate business need for such access." }) }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "How Long We Retain Your Personal Data" }) }
            ), /*#__PURE__*/
            _jsx("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: /*#__PURE__*/
              _jsx("p", { children: "We will retain your Personal Data as needed to fulfill the purposes for which it was collected. We will retain and use your Personal Data as necessary to comply with our business requirements, legal obligations, resolve disputes, protect our assets, and enforce our agreements. When we have no ongoing legitimate business need to process your Personal Data, we will either delete it or anonymize it." }) }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "Controlling Your Personal Data" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: [/*#__PURE__*/
              _jsx("p", { children: "Our marketing emails permit you to \"opt-out\" of or \u201Cunsubscribe\u201D from receiving further marketing emails. Subject to local law, you may have the right to access, delete, receive a copy of or object to or restrict the processing of, to data portability, or to request that we correct any inaccuracies." }), /*#__PURE__*/
              _jsx("p", { children: "You may contact us to exercise your rights using the contact details provided below. Please note that to fulfill your request, we may need you to provide certain information to verify your identity." })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "Cookies and Web Beacons" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: [/*#__PURE__*/
              _jsx("p", { children: "Like many websites, Laara Innovations uses automatic data collection tools, such as cookies, embedded web links, and web beacons. \u201CCookies\u201D are small text files that we and others may place in users' computer browsers to store their preferences. \u201CWeb beacons\u201D or \u201Cpixel tags\u201D are small pieces of code placed on a web page or within the body of an email to monitor the behavior." }), /*#__PURE__*/
              _jsx("p", { children: "To manage the use of targeting and advertising cookies on our Website, click the Cookie icon at the bottom left footer of the page or consult your individual browser settings for cookies." })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "General" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none space-y-8", children: [/*#__PURE__*/
              _jsxs("div", { children: [/*#__PURE__*/
                _jsx("h3", { className: "text-white text-lg font-bold", children: "Linked Websites" }), /*#__PURE__*/
                _jsx("p", { children: "Our Websites may contain links to other websites, applications, platforms, and services maintained by third parties. The information practices of these third parties are governed by their privacy policies." })] }
              ), /*#__PURE__*/
              _jsxs("div", { children: [/*#__PURE__*/
                _jsx("h3", { className: "text-white text-lg font-bold", children: "Forums and Chat Rooms" }), /*#__PURE__*/
                _jsx("p", { children: "We offer you the ability to post information and exchange ideas through our Websites and certain Product offerings. Be aware that the information you provide there will be made broadly available to others." })] }
              ), /*#__PURE__*/
              _jsxs("div", { children: [/*#__PURE__*/
                _jsx("h3", { className: "text-white text-lg font-bold", children: "Children's Privacy" }), /*#__PURE__*/
                _jsx("p", { children: "We do not knowingly collect Personal Data from children without appropriate parental or guardian consent." })] }
              )] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "Changes to this Privacy Statement" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: [/*#__PURE__*/
              _jsx("p", { children: "Laara Innovations may modify or update this Privacy Statement from time to time. When we make a material change, we will post the revised version with an updated \u2018effective date\u2019 at the top of this page." }), /*#__PURE__*/
              _jsx("p", { children: "You acknowledge that your continued use of our Website after we publish changes means that the collection, use, and sharing of your Personal Data is subject to the updated Privacy Statement." })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "Complaint Resolution" }) }
            ), /*#__PURE__*/
            _jsxs("div", { className: "lg:col-span-8 prose prose-invert max-w-none", children: [/*#__PURE__*/
              _jsx("p", { children: "Laara Innovations commits to resolve concerns about your privacy. If Laara Innovations cannot resolve the concern by internal procedures, then you agree that any disputes or claims will be determined solely in binding, individual arbitration pursuant to the Indian DPDPA, 2023." }), /*#__PURE__*/
              _jsx("p", { children: "If you work or reside in a country that is a member of the European Union or that is in the EEA, you have the right to lodge a complaint with the competent supervisory authority." })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16", children: [/*#__PURE__*/
            _jsx("div", { className: "lg:col-span-4", children: /*#__PURE__*/
              _jsx("h2", { className: "text-xl font-bold text-white uppercase tracking-wider sticky top-32", children: "How to Contact Us" }) }
            ), /*#__PURE__*/
            _jsx("div", { className: "lg:col-span-8 bg-white/5 p-8 lg:p-12 rounded-[2.5rem] border border-white/10", children: /*#__PURE__*/
              _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: [/*#__PURE__*/
                _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
                  _jsx("h4", { className: "text-primary font-bold uppercase tracking-widest text-xs", children: "Mailing Address" }), /*#__PURE__*/
                  _jsxs("address", { className: "not-italic text-sm text-gray-300 leading-relaxed", children: ["Laara Innovations Pvt. Ltd.", /*#__PURE__*/
                    _jsx("br", {}), "Vijayawada, near Amaravathi", /*#__PURE__*/
                    _jsx("br", {}), "Andhra Pradesh, 521101"] }

                  )] }
                ), /*#__PURE__*/
                _jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/
                  _jsx("h4", { className: "text-primary font-bold uppercase tracking-widest text-xs", children: "Digital & Voice" }), /*#__PURE__*/
                  _jsxs("p", { className: "text-sm text-gray-300", children: ["Email: ", /*#__PURE__*/_jsx("a", { href: `mailto:${config.contactEmail || "laarainnovations26@gmail.com"}`, className: "text-white hover:text-primary transition-colors", children: config.contactEmail || "laarainnovations26@gmail.com" })] }), /*#__PURE__*/
                  _jsx("p", { className: "text-sm text-gray-300", children: "Phone: +91 9010906126" })] }
                )] }
              ) }
            )] }
          )] }
        )] }
      ), /*#__PURE__*/
      _jsx(Footer, { config: config })] }
    ));

}