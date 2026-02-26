import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase, Clock, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const departments = ['All', 'Hospitality', 'Culinary', 'Spa & Wellness', 'Management', 'Operations'];
const locations = ['All Locations', 'Asia', 'Europe', 'Americas', 'Middle East & Africa'];

const jobs = [
  {
    id: '1',
    title: 'Front Office Manager',
    department: 'Management',
    location: 'Aman Tokyo, Japan',
    type: 'Full-time',
    description: 'Oversee all front office operations and ensure exceptional guest experiences.',
  },
  {
    id: '2',
    title: 'Executive Chef',
    department: 'Culinary',
    location: 'Aman New York, USA',
    type: 'Full-time',
    description: 'Lead the culinary team and create exceptional dining experiences.',
  },
  {
    id: '3',
    title: 'Spa Therapist',
    department: 'Spa & Wellness',
    location: 'Amanpuri, Thailand',
    type: 'Full-time',
    description: 'Provide world-class spa treatments and wellness experiences.',
  },
  {
    id: '4',
    title: 'Guest Experience Coordinator',
    department: 'Hospitality',
    location: 'Amangiri, USA',
    type: 'Full-time',
    description: 'Coordinate unique experiences and adventures for our guests.',
  },
  {
    id: '5',
    title: 'Reservations Agent',
    department: 'Operations',
    location: 'Remote',
    type: 'Full-time',
    description: 'Handle reservations and provide exceptional customer service.',
  },
  {
    id: '6',
    title: 'Sous Chef',
    department: 'Culinary',
    location: 'Aman Venice, Italy',
    type: 'Full-time',
    description: 'Support the Executive Chef in daily kitchen operations.',
  },
];

export function CareersPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesLocation =
      selectedLocation === 'All Locations' || job.location.includes(selectedLocation);
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesLocation && matchesSearch;
  });

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.animate-in');
    if (!elements) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          }
        );
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src="/images/hotels/aman-tokyo.jpg"
          alt="Careers at Aman"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">Join Our Team</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Careers at Aman
            </h1>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed mb-8">
            Join a team of passionate individuals dedicated to creating extraordinary 
            experiences for our guests. At Aman, we believe in nurturing talent and 
            providing opportunities for growth.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed">
            With properties in 20 countries, Aman offers diverse career opportunities 
            across hospitality, culinary arts, spa & wellness, and more. Discover your 
            next chapter with us.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-white/50 mb-4">Why Aman</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light">Employee Benefits</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
              { title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programs' },
              { title: 'Travel Perks', description: 'Discounted stays at Aman properties worldwide' },
              { title: 'Career Growth', description: 'Professional development and advancement opportunities' },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-xl font-serif font-light mb-3">{benefit.title}</h3>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="container-aman py-20">
        <div className="text-center mb-12">
          <p className="caption-uppercase text-[#9A9A9A] mb-4">Open Positions</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
            Current Opportunities
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
            <input
              type="text"
              placeholder="Search positions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
            />
          </div>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A] bg-white"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A] bg-white"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-[#E5E0D8] overflow-hidden"
            >
              <button
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-[#F5F0E8] transition-colors"
              >
                <div className="text-left">
                  <h3 className="text-lg font-serif font-light text-[#1A1A1A]">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#6B6B6B]">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-[#9A9A9A] transition-transform',
                    expandedJob === job.id && 'rotate-180'
                  )}
                />
              </button>
              {expandedJob === job.id && (
                <div className="px-6 pb-6 border-t border-[#E5E0D8] pt-4">
                  <p className="text-[#6B6B6B] mb-4">{job.description}</p>
                  <Link
                    to={`/about/careers/apply/${job.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6B6B6B]">No positions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
