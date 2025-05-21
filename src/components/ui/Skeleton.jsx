const Skeleton = () => {
  return (
    <div className="min-h-screen bg-muted animate-pulse">
      <div className="md:hidden px-4 py-3 border-b border-gray-200 bg-white">
        <div className="h-6 w-24 bg-gray-300 rounded mb-1"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
      
      <div className="hidden md:grid grid-cols-12 min-h-screen">
        <aside className="col-span-3 lg:col-span-2 bg-white border-r border-gray-200 p-4">
          <div className="space-y-4">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
            <div className="h-5 w-20 bg-gray-200 rounded"></div>
            <div className="h-5 w-28 bg-gray-200 rounded"></div>
          </div>
        </aside>

        <main className="col-span-9 lg:col-span-10 p-6 space-y-6">
          <div className="h-7 w-48 bg-gray-300 rounded"></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow space-y-3"
              >
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <div className="md:hidden px-4 py-6 space-y-4">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow space-y-3"
          >
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;