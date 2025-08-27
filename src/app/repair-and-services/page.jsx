'use client';
import TopCleaningBrands from '../components/TopCleaningBrands';

export default function RepairAndServicesPage() {
	return (
		<main className="bg-white text-[#2b2b2b]">
			{/* Hero Section */}
			<section
				className="w-full h-[500px] bg-cover bg-center flex items-center text-left"
				style={{ backgroundImage: "url('/banner-img/Repair&service-img2.webp')" }}
			/>

			{/* Main Content */}
			<section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
				{/* Left Side Content (2/3 width) */}
				<div className="md:col-span-2 space-y-8">
					<div>
						<h2 className="text-3xl font-bold mb-4">Is Your Vacuum In Need Of Some TLC?</h2>
						<p className="text-base leading-7">
							A faulty vacuum can disrupt your cleaning routine, but at Vaccom, we specialise in quick,
							reliable vacuum repairs to restore your appliance to its best performance in no time.
						</p>
					</div>

					{/* Two-column section with image */}
					<div className="grid md:grid-cols-2  gap-0 mt-5">
						{/* Left Text Block */}
						<div className="flex flex-col justify-center md:p-12  bg-white">
							<h3 className="text-4xl font-bold leading-snug text-red-600">
								Why Choose <br />
								<span className="text-black">Vaccom for</span>
								<br />
								Vacuum Repairs?
							</h3>
							<p className="text-base leading-7 text-gray-800">
								Is Your Vacuum in Need of Some Care? A malfunctioning vacuum disrupts your cleaning and
								leaves dirt behind. At Vaccom, we specialise in fast, dependable repairs that restore
								performance and extend your vacuum’s life.
							</p>
						</div>

						{/* Right Background Image Block */}
						<div
							className="h-[500px] md:h-auto w-full bg-cover bg-center"
							style={{ backgroundImage: "url('/banner-img/Repair&service-img1.webp')" }}
						/>
					</div>
				</div>

				{/* Right Sidebar */}
				<aside className="space-y-8">
					<div>
						<h4 className="text-xl font-semibold mb-2">Location Cheltenham</h4>
						<ul className="space-y-2 text-sm text-black">
							<li>→ Dyson Vaccum Repair and Services</li>
							<li>→ Electrolux Vaccum Repair and Services</li>
							<li>→ Hoover Vaccum Repair and Services</li>
							<li>→ Miele Vaccum Repair and Services</li>
							<li>→ Robot Vaccum Repair and Services</li>
							<li>→ Shark Vaccum Repair and Services</li>
						</ul>
					</div>
					<div>
						<h4 className="text-xl font-semibold mb-2">Location Geelong</h4>
						<ul className="space-y-2 text-sm text-black">
							<li>→ Electrolux Vaccum Repair and Services</li>
							<li>→ Dyson Vaccum Repair and Services</li>
							<li>→ Hoover Vaccum Repair and Services</li>
							<li>→ Miele Vaccum Repair and Services</li>
						</ul>
					</div>
					<div>
						<h4 className="text-xl font-semibold mb-2">Location Sunbury</h4>
						<ul className="space-y-2 text-sm text-black">
							<li>→ Dyson Vacuum Repair and Services in Sunbury</li>
							<li>→ Electrolux Vacuum Repair and Services in Sunbury</li>
							<li>→ Hoover Vaccum Repair and Services in Sunbury</li>
							<li>→ Miele Vaccum Repair and Services</li>
							<li>→ Robot Vaccum Repair and Services</li>

							<li>→ Shark Vaccum Repair and Services</li>
						</ul>
					</div>
				</aside>
			</section>

			{/* Main Content */}
			<section className="max-w-7xl mx-auto px-2 py-4 grid md:grid-cols-3 gap-10">
				{/* Left Side Content (2/3 width) */}
				<div className="md:col-span-2 space-y-8">
					<div>
						<h2 className="text-3xl font-bold mb-4">Contact us for Same-day Support</h2>
						<p className="text-base leading-7">
							Need fast and reliable Vaccom repair or servicing? Our expert team is here to help with
							same-day support across Melbourne. Whether it’s a sudden loss of suction, strange noises, or
							general maintenance, we’ll diagnose and fix the issue quickly using quality, brand-approved
							parts. Contact Vaccom today for professional service you can trust—when you need it most.
						</p>
					</div>
				</div>
			</section>
                  <TopCleaningBrands />

		</main>
	);
}
