# The HRMS Server Site

## Contributing to The HRMS Server Project

1. **Fork the Repository**

   - Go to [HRMS-Server on GitHub](https://github.com/A1-mamun/HRMS-Server) and click the "Fork" button at the top right of the page.

2. **Clone Your Fork**

   - Run the following command to clone your fork to your local machine:
     ```bash
     git clone https://github.com/<your-username>/HRMS-Server.git
     ```

3. **Set Upstream Remote**

   - Navigate to your project directory:
     ```bash
     cd HRMS-Server
     ```
   - Add the original repository as an upstream remote:
     ```bash
     git remote add upstream https://github.com/A1-mamun/HRMS-Server.git
     ```

4. **Pull Updates from Upstream**

   - Fetch the latest changes from the original repository:
     ```bash
     git fetch upstream
     ```
   - Merge changes into your local branch:
     ```bash
     git merge upstream/main
     ```

5. **Create a Pull Request**
   - Push your changes to your fork:
     ```bash
     git push origin <your-branch>
     ```
   - Open a pull request from your fork's branch to the main repository's `main` branch.
