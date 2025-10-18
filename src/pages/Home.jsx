import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-200 ">
      <div
        className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden relative flex"
      >
        <div className="bg-white h-full w-full px-5 pt-6 pb-20 overflow-y-auto">
          <div className="mb-3">
            <h1 className="text-3xl font-bold">Today</h1>
            <p className="text-sm text-gray-500 uppercase font-bold">
              THURSDAY 6 AUGUST
            </p>
          </div>

          {/* CARD 1 */}
          <div className="mb-5">
            <a
              href="#"
              className="block rounded-lg relative p-5 transform transition-all duration-300 scale-100 hover:scale-95"
              style={{
                background:
                  "url(https://images.unsplash.com/photo-1484876065684-b683cf17d276?auto=format&fit=crop&w=668&q=80) center / cover",
              }}
            >
              <div className="absolute top-0 right-0 -mt-3 mr-3">
                <div className="rounded-full bg-indigo-500 text-white text-xs py-1 pl-2 pr-3 leading-none flex items-center gap-1">
                  <i className="mdi mdi-fire text-base"></i>
                  <span>FRESH</span>
                </div>
              </div>
              <div className="h-48"></div>
              <h2 className="text-white text-2xl font-bold leading-tight mb-3 pr-5">
                Tasnim Lacey New Album Out&nbsp;Now
              </h2>
              <div className="flex w-full items-center text-sm text-gray-300 font-medium">
                <div className="flex-1 flex items-center">
                  <div
                    className="rounded-full w-8 h-8 mr-3"
                    style={{
                      background:
                        "url(https://randomuser.me/api/portraits/women/74.jpg) center / cover",
                    }}
                  ></div>
                  <div>Gwen Thomson</div>
                </div>
                <div>
                  <i className="mdi mdi-thumb-up"></i> 18
                </div>
              </div>
            </a>
          </div>

          {/* CARD 2 */}
          <div className="mb-5">
            <a
              href="#"
              className="block rounded-lg relative p-5 transform transition-all duration-300 scale-100 hover:scale-95"
              style={{
                background:
                  "url(https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1649&q=80) center / cover",
              }}
            >
              <div className="h-48"></div>
              <h2 className="text-white text-2xl font-bold leading-tight mb-3 pr-5">
                Top 5 Cocktail Bars in&nbsp;NYC
              </h2>
              <div className="flex w-full items-center text-sm text-gray-300 font-medium">
                <div className="flex-1 flex items-center">
                  <div
                    className="rounded-full w-8 h-8 mr-3"
                    style={{
                      background:
                        "url(https://randomuser.me/api/portraits/women/55.jpg) center / cover",
                    }}
                  ></div>
                  <div>Kayden Buckley</div>
                </div>
                <div>
                  <i className="mdi mdi-thumb-up"></i> 7
                </div>
              </div>
            </a>
          </div>

          {/* YESTERDAY SECTION */}
          <div className="mb-3">
            <h1 className="text-3xl font-bold">Yesterday</h1>
            <p className="text-sm text-gray-500 uppercase font-bold">
              WEDNESDAY 5 AUGUST
            </p>
          </div>

          {/* GRID OF CARDS */}
          <div className="flex -mx-1 mb-5">
            <div className="w-1/2 px-1">
              <a
                href="#"
                className="block mb-2 p-5 rounded overflow-hidden transform transition-all duration-300 scale-100 hover:scale-95"
                style={{
                  background:
                    "url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=60) center / cover",
                }}
              >
                <div className="h-24"></div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  DJ Dan Spins The Wheels
                </h3>
              </a>

              <a
                href="#"
                className="block mb-2 p-5 rounded overflow-hidden transform transition-all duration-300 scale-100 hover:scale-95"
                style={{
                  background:
                    "url(https://images.unsplash.com/photo-1534329539061-64caeb388c42?auto=format&fit=crop&w=800&q=60) center / cover",
                }}
              >
                <div className="h-32"></div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  Top Travels Destinations For 2020
                </h3>
              </a>
            </div>

            <div className="w-1/2 px-1">
              <a
                href="#"
                className="block mb-2 p-5 rounded overflow-hidden transform transition-all duration-300 scale-100 hover:scale-95"
                style={{
                  background:
                    "url(https://images.unsplash.com/photo-1526661934280-676cef25bc9b?auto=format&fit=crop&w=800&q=60) center / cover",
                }}
              >
                <div className="h-32"></div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  M&S Launches New Makeup Range!
                </h3>
              </a>

              <a
                href="#"
                className="block mb-2 p-5 rounded overflow-hidden transform transition-all duration-300 scale-100 hover:scale-95"
                style={{
                  background:
                    "url(https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?auto=format&fit=crop&w=800&q=60) center / cover",
                }}
              >
                <div className="h-24"></div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  APT Set To Be A&nbsp;Ripper
                </h3>
              </a>
            </div>
          </div>

          {/* PREVIOUS SECTION */}
          <div className="mb-3">
            <h1 className="text-3xl font-bold">Previous</h1>
          </div>

          {/* REPEATED ARTICLES */}
          {[
            {
              img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=60",
              cat: "SPORTS",
              author: "Jack Ryan",
              authorImg: "https://randomuser.me/api/portraits/men/41.jpg",
            },
            {
              img: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=800&q=60",
              cat: "ART",
              author: "Kevin Jackson",
              authorImg: "https://randomuser.me/api/portraits/men/63.jpg",
            },
            {
              img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=60",
              cat: "MUSIC",
              author: "Rowena Wheeler",
              authorImg: "https://randomuser.me/api/portraits/women/11.jpg",
            },
            {
              img: "https://images.unsplash.com/photo-1511068797325-6083f0f872b1?auto=format&fit=crop&w=800&q=60",
              cat: "WORLD",
              author: "Gwen Thomson",
              authorImg: "https://randomuser.me/api/portraits/women/74.jpg",
            },
          ].map((item, i) => (
            <div key={i}>
              <div>
                <a
                  href="#"
                  className="flex w-full transform transition-all duration-300 scale-100 hover:scale-95"
                >
                  <div
                    className="block h-24 w-2/5 rounded overflow-hidden"
                    style={{
                      background: `url(${item.img}) center / cover`,
                    }}
                  ></div>
                  <div className="pl-3 w-3/5">
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      {item.cat}
                    </p>
                    <h3 className="text-md font-semibold leading-tight mb-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </h3>
                    <div className="flex w-full items-center text-xs text-gray-500 font-medium">
                      <div
                        className="rounded-full w-5 h-5 mr-3"
                        style={{
                          background: `url(${item.authorImg}) center / cover`,
                        }}
                      ></div>
                      <div>{item.author}</div>
                    </div>
                  </div>
                </a>
              </div>
              <hr className="border-gray-200 my-3" />
            </div>
          ))}
        </div>

    
      </div>
    </div>
  );
};

export default Home;
