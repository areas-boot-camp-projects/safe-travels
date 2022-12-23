# Project 2
- Use Node.js and Express.js to create a RESTful API.
- Use Handlebars.js.
- MySQL and ORM.
- GET and POST routes. More is okay.
- One new library, package, or technology.
- MVC paradigm (three folders).
- Must include authentication. Express-sessions (or JWT) and cookies.
- API keys and other sensitive information in .env file.

- Must be deployed to Heroku.
- Polished UI.
- Responsive.
- Must be interactive.
- Quality code and standards.
- Professional README.

- 10-minutes presentation.
- Overall concept, motivation, design process, tech, demo, directions for future dev (similar to last time).

- Brainstorm.
- Think about APIs.
- Design the project.
- Submit a proposal.
- 60 minutes to complete.

- Full-stack project with front and back end.

- We can use third-party APIs. But do we have to?

---
- Christian: Room 8.

Brianstorm:
- Voting app.
	- People can sign up and vote on anything.
	- Vote could be anonymous or public.
- Craigslist “clone”. Something simple.
	- Post.
	- Favorites.
- Payroll app.
- COVID-related app.
	- See stats by region.
	- US only to start.
	- Drill down from state to city or county.
	- Gradient for risk tolerance.
	- Kind of like fire warnings.
		- Low Risk - Green
		- Medium Risk - Yellow
		- High Risk - Red
	- Use APIs to get data.
	- Users must sign up for an account.
	- DB:
		- Store users.
		- Store risk levels.
	- Some kind of notifications/subscriptions. Could be email or something else. Maybe you just favorite states or city.

# Proposal
- Users go to site to get a sense of risk to travel somewhere.
- Risk is communicated with simple tier:
	- Low Risk - Green
	- Medium Risk - Yellow
	- High Risk - Red
- See risk/stats for US, with ability to drill down to state > city/county.
- Use third-party APIs to get data (infections, hospitalizations, and deaths).
- DB will house user information, risk levels and definitions, and maybe favorites and a dashboard.
- Users must sign up to use app.
- Could have a map. Maybe use Google Maps!
- Could use email notifications.

## Tech Stack:
- Tailwind CSS.
- Handlebars.js.
- Node.js and Express.js.
- MySQL.
- JWT authentication (maybe).
- Stripe for donations 😈 (*extra credit*).

## Team Interest:
- Front End:
	- Mark
	- Mariama
- Back End:
	- Christian
	- E
