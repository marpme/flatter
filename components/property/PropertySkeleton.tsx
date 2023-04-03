import React from 'react'
import ContentLoader from 'react-content-loader'

const PropertySkeleton: React.FC = () => (
    <ContentLoader
        speed={2}
        width={310}
        height={500}
        viewBox="0 0 310 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="8" rx="3" ry="3" width="250" height="300" />

        <rect x="0" y="320" rx="3" ry="3" width="250" height="12" />
        <rect x="0" y="340" rx="3" ry="3" width="250" height="12" />
        <rect x="0" y="360" rx="3" ry="3" width="250" height="12" />
        <rect x="0" y="380" rx="3" ry="3" width="250" height="12" />
        <rect x="0" y="400" rx="3" ry="3" width="250" height="12" />
        <rect x="150" y="430" rx="3" ry="3" width="100" height="24" />
    </ContentLoader>
)

export default PropertySkeleton
