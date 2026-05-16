with open('src/App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
lines = lines[:8] + ["import { ROLES, CURRENT_USERS, DEPARTMENTS, WORKFORCE, INITIAL_SESSIONS, INITIAL_REQUESTS } from './data.js';\n\n"] + lines[279:]
with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)
