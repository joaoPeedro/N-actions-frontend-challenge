# Public Sales Feature

This directory houses the `public-sales` feature module, representing the primary business domain context of our marketplace.

## Design Decision Notes

> [!NOTE]
> **Naming Rationale:**  
> The feature is named `public-sales` to match the ubiquitous domain language. It owns the Public Sales bounded context, which includes the Public Sales Calendar, the Public Sale Catalog, and the Vehicle Details (as Vehicle Lots). It represents the business domain rather than individual pages, serving as the single source of truth for the public sales domain boundaries.
