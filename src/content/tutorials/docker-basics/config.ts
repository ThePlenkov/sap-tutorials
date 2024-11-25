export const tutorialConfig = {
  order: 1,
  tasks: [
    'docker-intro',
    'running-containers',
    'building-images',
    'nodejs-containerization',
    'docker-compose'
  ],
  quizzes: {
    'docker-intro': [
      {
        text: "What is a Docker container?",
        options: [
          { text: "A virtual machine running a full OS", correct: false },
          { text: "A lightweight, standalone executable package", correct: true },
          { text: "A physical server", correct: false },
          { text: "A development framework", correct: false }
        ]
      },
      {
        text: "What is the main difference between containers and VMs?",
        options: [
          { text: "Containers are faster but less secure", correct: false },
          { text: "VMs are always better for production", correct: false },
          { text: "Containers share the host OS kernel", correct: true },
          { text: "VMs use less resources", correct: false }
        ]
      }
    ],
    'building-images': [
      {
        text: "What file is used to define a Docker image?",
        options: [
          { text: "docker.json", correct: false },
          { text: "container.yaml", correct: false },
          { text: "Dockerfile", correct: true },
          { text: "image.conf", correct: false }
        ]
      },
      {
        text: "What is Docker layer caching?",
        options: [
          { text: "A way to compress images", correct: false },
          { text: "Reusing unchanged parts of an image", correct: true },
          { text: "Storing images in the cloud", correct: false },
          { text: "Encrypting image data", correct: false }
        ]
      }
    ]
  }
};