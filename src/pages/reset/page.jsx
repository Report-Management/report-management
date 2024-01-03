export const ResetView = () => {
    return (
        <div>
            <label htmlFor="email"> Your Email </label>
            <input
                type="email"
                name="email"
                id="email"
                className="input w-full bg-gray-100 dark:bg-gray-700"
                placeholder="name@rupp.edu.kh"
            />
        </div>
    )
}