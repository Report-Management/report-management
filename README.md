# Report Management System, RUPP

A school's Report Management System handles various issues, like electrical outages or air conditioning problems. It streamlines the reporting process, prioritizes tasks, and ensures efficient issue resolution. Contact the school's administrative offices for specific details.

### Login
![image info](assets/login.png)


### User
|             Report Page             |                        Create Report                        |
|:-----------------------------------:|:-----------------------------------------------------------:|
|  ![image info](assets/User/1.png)   |              ![image info](assets/User/2.png)               |
| Create Report  <br/>select category | Completed Page<br/>User can check is their report completed |
|  ![image info](assets/User/3.png)   |              ![image info](assets/User/4.png)               |
|            MyReport Page            |                      Dropdown Profile                       |
|  ![image info](assets/User/5.png)   |              ![image info](assets/User/6.png)               |
|            Logout Dialog            | 
|  ![image info](assets/User/7.png)   |


### Admin
|           Dashboard Page            |           See all Report            |
|:-----------------------------------:|:-----------------------------------:|
|  ![image info](assets/Admin/1.png)  |  ![image info](assets/Admin/2.png)  |
|            Report Detail            |     Summary report with Gemini      |
| ![image info](assets/Admin/1.1.png) | ![image info](assets/Admin/1.2.png) |
|         Filter by Category          |           Filter by Type            |
| ![image info](assets/Admin/2.1.png) | ![image info](assets/Admin/2.2.png) |
|         Filter by Priority          |    Mark Approved/Unapproved Page    |
| ![image info](assets/Admin/2.3.png) |  ![image info](assets/Admin/3.png)  |
|   Mark Completed/InCompleted Page   |         Spam Detection Page         |
|  ![image info](assets/Admin/4.png)  |  ![image info](assets/Admin/5.png)  |
|           Create Account            |           Create Account            |
|  ![image info](assets/Admin/6.png)  |  ![image info](assets/Admin/7.png)  |

### AI Model
|     Model      |             Method             |
|:--------------:|:------------------------------:|
| Summary Report |           Gemini API           |
| Spam Detection | CountVectorizer and NaiveBayes |

### UI Library
- Tailwind CSS
- DaisyUI
- Flowbit

### Backend
| Technology |                            Description                            |
|:----------:|:-----------------------------------------------------------------:|
|  FastAPI   |            Framework for build restful api with python            |
|   Resend   |                  Resend is service of send gmail                  |
|   Heroku   |                       Service to deploy api                       |
|  Supabase  | Alternative firebase but it provide PostgreSQL and Authentication |

