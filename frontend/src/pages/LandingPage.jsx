import { motion } from "motion/react";
import { Mic, Volume2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F0FF] text-[#2F2A44]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 md:px-12">
        <motion.button
          onClick={() => navigate("/")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-tight cursor-pointer"
        >
          Echo Script
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <button
            onClick={() => navigate("/login")}
            className="
              rounded-xl
              px-4
              py-2
              text-sm
              font-medium
              text-[#504e51]
              transition
              hover:bg-white
              cursor-pointer
            "
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="
              rounded-xl
              bg-[#745383]
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              shadow-sm
              transition
              hover:bg-[#644570]
              cursor-pointer
            "
          >
            Sign up
          </button>
        </motion.div>
      </nav>

      {/* Hero */}
      <main className="px-6">
        <section className="mx-auto flex min-h-[calc(100vh-96px)] max-w-5xl flex-col items-center justify-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="mb-5 text-sm font-medium tracking-wide text-[#745383]">
              SPEECH • TEXT • FOCUS
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Your voice,
              <br />
              <span className="text-[#745383]">
                captured.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-500 md:text-xl">
              Echo Script turns your speech into text and your scripts into
              natural-sounding audio — all in one simple workspace.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/signup")}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#745383]
                px-7
                py-3.5
                font-semibold
                text-white
                shadow-md
                transition
                hover:bg-[#644570]
                cursor-pointer
              "
            >
              Get started
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                px-7
                py-3.5
                font-semibold
                text-[#504e51]
                shadow-sm
                transition
                hover:bg-gray-50
                cursor-pointer
              "
            >
              Login
            </motion.button>
          </motion.div>

          {/* Audio visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="
              mt-16
              flex
              items-center
              gap-5
              rounded-2xl
              border
              border-white
              bg-white/70
              px-7
              py-5
              shadow-sm
              backdrop-blur
            "
          >
            <Mic
              size={22}
              strokeWidth={1.8}
              className="text-[#745383]"
            />

            <div className="flex items-center gap-1">
              {[12, 20, 30, 17, 25, 36, 22, 15, 28, 18, 12].map(
                (height, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      scaleY: [1, 1.35, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: index * 0.08,
                      ease: "easeInOut",
                    }}
                    style={{ height: `${height}px` }}
                    className="
                      block
                      w-1
                      rounded-full
                      bg-[#745383]
                      opacity-60
                    "
                  />
                )
              )}
            </div>

            <Volume2
              size={22}
              strokeWidth={1.8}
              className="text-[#745383]"
            />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
              mt-16
              grid
              w-full
              max-w-2xl
              grid-cols-1
              gap-4
              sm:grid-cols-2
            "
          >
            <Feature
              icon={<Mic size={20} strokeWidth={1.8} />}
              title="Speech to text"
              description="Record your voice and turn it into a timestamped transcript."
            />

            <Feature
              icon={<Volume2 size={20} strokeWidth={1.8} />}
              title="Text to speech"
              description="Turn your scripts into natural-sounding audio."
            />
          </motion.div>

        </section>
      </main>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white
        bg-white/70
        p-5
        text-left
        shadow-sm
      "
    >
      <div
        className="
          mb-3
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          bg-[#F4F0FF]
          text-[#745383]
        "
      >
        {icon}
      </div>

      <h3 className="font-semibold text-[#2F2A44]">
        {title}
      </h3>

      <p className="mt-1.5 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default LandingPage;