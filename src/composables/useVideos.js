import { ref, computed, watch, onMounted } from 'vue'

export function useVideos() {
  const videos = ref([])
  const searchQuery = ref('')
  const totalLikes = ref(0)
  const isLoading = ref(true)
  const sortByViews = ref(false)

  const mockVideos = [
    {
      id: 1,
      title: 'Learn Vue 3 Composition API in 10 Minutes',
      channel: 'Vue Mastery',
      views: 1250000,
      thumbnail: 'https://picsum.photos/400/225?random=1'
    },
    {
      id: 2,
      title: 'JavaScript ES6+ Features You Need to Know',
      channel: 'Code Academy',
      views: 890000,
      thumbnail: 'https://picsum.photos/400/225?random=2'
    },
    {
      id: 3,
      title: 'Building Modern Web Apps with React',
      channel: 'React Pro',
      views: 2100000,
      thumbnail: 'https://picsum.photos/400/225?random=3'
    },
    {
      id: 4,
      title: 'CSS Grid vs Flexbox: When to Use What',
      channel: 'CSS Tricks',
      views: 450000,
      thumbnail: 'https://picsum.photos/400/225?random=4'
    },
    {
      id: 5,
      title: 'Node.js Backend Development Tutorial',
      channel: 'Backend Dev',
      views: 780000,
      thumbnail: 'https://picsum.photos/400/225?random=5'
    },
    {
      id: 6,
      title: 'TypeScript for Beginners',
      channel: 'TypeScript Hub',
      views: 320000,
      thumbnail: 'https://picsum.photos/400/225?random=6'
    },
    {
      id: 7,
      title: 'Docker Containerization Guide',
      channel: 'DevOps Master',
      views: 650000,
      thumbnail: 'https://picsum.photos/400/225?random=7'
    },
    {
      id: 8,
      title: 'Git and GitHub Workflow Best Practices',
      channel: 'Git Expert',
      views: 420000,
      thumbnail: 'https://picsum.photos/400/225?random=8'
    }
  ]

  const filteredVideos = computed(() => {
    let filtered = videos.value

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(query) ||
        video.channel.toLowerCase().includes(query)
      )
    }

    if (sortByViews.value) {
      filtered = [...filtered].sort((a, b) => b.views - a.views)
    }

    return filtered
  })

  const videosFound = computed(() => filteredVideos.value.length)

  const handleLike = (isLiked) => {
    if (isLiked) {
      totalLikes.value++
    } else {
      totalLikes.value = Math.max(0, totalLikes.value - 1)
    }
  }

  const toggleSort = () => {
    sortByViews.value = !sortByViews.value
  }

  const clearSearch = () => {
    searchQuery.value = ''
  }

  const fetchVideos = () => {
    isLoading.value = true
    
    setTimeout(() => {
      videos.value = mockVideos
      isLoading.value = false
    }, 1500)
  }

  watch(searchQuery, (newQuery) => {
    console.log('Search query changed:', newQuery)
  })

  onMounted(() => {
    fetchVideos()
  })

  return {
    videos,
    searchQuery,
    totalLikes,
    isLoading,
    sortByViews,
    
    filteredVideos,
    videosFound,
    
    handleLike,
    toggleSort,
    clearSearch
  }
}