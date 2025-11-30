# AdTruth Ad Fraud Detection Dataset

**Version:** 1.0.0 (Preview)
**Date:** November 2025
**License:** CC BY-NC 4.0 International
**Author:** Hongyi Shui
**Target Release:** Q3-Q4 2026

---

## TL;DR

**Problem:** Existing ad fraud datasets are 8-13 years old with only click timestamps—no behavioral signals.

**Solution:** 3M+ sessions with behavioral biometrics (mouse dynamics, scroll patterns, touch events) at 100ms resolution.

**What's Novel:**
- First dataset combining behavioral features + fraud labels + adversarial samples at scale
- Physics-based ground truth (superhuman velocity = bot) with confidence scores
- Multi-tier labels enabling supervised, semi-supervised, and self-supervised research

**Research Impact:** Enables temporal models (LSTMs, Transformers), adversarial robustness testing, and industry-specific fraud analysis.

**Interested?** Email contact@adtruth.io | **Target Release:** Q3-Q4 2026

---

## Research Motivation

The ad fraud research community lacks datasets with behavioral biometrics. Existing public datasets (TalkingData 2017, FDMA 2012, Avazu 2014) contain only click logs and timestamps—no mouse movements, scroll patterns, or interaction dynamics. Meanwhile, behavioral biometrics datasets focus on user authentication, not ad fraud.

To our knowledge, AdTruth is the first large-scale behavioral ad fraud dataset, providing:
- Rich behavioral signals at 100ms temporal resolution (mouse velocity, scroll depth, touch dynamics)
- 200+ derived behavioral features per session
- Physics-based ground truth with confidence scores (not heuristic labels)
- CAPTCHA-verified labels via Cloudflare Turnstile
- Session-level sequences enabling temporal modeling
- Adversarial bot samples for robustness research
- Modern 2025-2026 production data (vs. 7-13 year old alternatives)

---

## Abstract

AdTruth is a large-scale ad fraud detection dataset with 3M+ web sessions from SMB websites, featuring 200+ behavioral features at 100ms resolution. Unlike existing datasets (TalkingData, FDMA, Avazu) that contain only click timestamps, AdTruth captures mouse dynamics, scroll patterns, click timing, and touch events.

**Key features:**
- Multi-tier labels: Hard (physics-based + CAPTCHA), Soft (ensemble scores), Unlabeled
- 300K+ hard-labeled sessions with 90-100% confidence
- 50K+ adversarial bot samples across 6 evasion techniques
- 20 SMB industry categories over 18+ months

---

## Table of Contents

1. [Comparison with Existing Datasets](#1-comparison-with-existing-datasets)
2. [Dataset Description](#2-dataset-description)
3. [Data Collection Methodology](#3-data-collection-methodology)
4. [Ground Truth Labeling](#4-ground-truth-labeling)
5. [Data Dictionary](#5-data-dictionary)
6. [Exploratory Statistics](#6-exploratory-statistics)
7. [Known Limitations and Biases](#7-known-limitations-and-biases)
8. [Ethical Considerations](#8-ethical-considerations)
9. [Citation and Contact](#9-citation-and-contact)

---

## 1. Comparison with Existing Datasets

### 1.1 The Gap in Current Research

| Feature | TalkingData (2017) | FDMA 2012 | Avazu (2014) | AdTruth (2026) |
|---------|-------------------|-----------|--------------|----------------|
| Scale | 184M clicks | 8M clicks | 40M clicks | 3M+ sessions |
| Data Age | 8+ years | 13+ years | 11+ years | Current (2026) |
| Behavioral signals | No | No | No | Yes |
| Ad fraud context | Yes | Yes | Partial | Yes |
| Temporal resolution | 1 second | N/A | 1 hour | 100ms |
| Session sequences | No | No | No | Yes |
| Feature dimensions | 7 | 12 | 24 | 200+ |
| Adversarial samples | No | No | No | Yes |
| Multi-tier labels | No | No | No | Yes |
| Confidence scores | No | No | N/A | Yes |
| Industry metadata | No | No | No | Yes |
| CAPTCHA verification | No | No | No | Yes |
| Semi-supervised ready | No | No | No | Yes |

### 1.2 Why Existing Datasets Are Insufficient

**TalkingData (2017):** The most-cited ad fraud dataset contains 184 million mobile app install records but provides only 7 features: IP, app, device, OS, channel, click time, and attribution. No behavioral signals. Binary labels with unknown methodology. Data is now 8+ years old—modern bots have evolved significantly.

**FDMA 2012 BuzzCity:** Publisher-level fraud detection with ~8 million clicks and 12 features. Heavily anonymized, missing values, mobile-only. 13+ years old. Labels derived from unknown heuristics.

**Avazu (2014):** Click-through rate prediction dataset. Not designed for fraud detection—contains no fraud labels.

### 1.2.1 Adjacent Work: Behavioral Biometrics

While not ad fraud datasets, behavioral biometrics research provides relevant methodology:

- **Balabit Mouse Dynamics (2016):** Rich mouse movement data for user authentication. 10 users in controlled lab environment. Demonstrates behavioral signals can distinguish individuals.
- **BeCAPTCHA-Mouse:** Mouse dynamics for bot detection in CAPTCHA contexts. Smaller scale but validates behavioral approach.

### 1.3 Novel Research Opportunities

1. **Can behavioral biometrics detect sophisticated bot farms?** — First dataset with 200+ behavioral features AND fraud labels at scale
2. **How do adversarial bots adapt to detection?** — Dataset includes 50K+ labeled evasion samples
3. **Do temporal models (LSTMs, Transformers) outperform static classifiers?** — Full session sequences available
4. **How do fraud patterns differ across industries?** — 20 SMB industry categories
5. **Can graph neural networks detect coordinated fraud?** — Network/IP clustering features
6. **How effective is semi-supervised learning for fraud detection?** — Multi-tier label structure with unlabeled samples

---

## 2. Dataset Description

### 2.1 Overview

| Attribute | Value |
|-----------|-------|
| Total Sessions | 3,000,000+ |
| Hard-Labeled Sessions | 300,000+ |
| Soft-Labeled Sessions | 1,800,000+ |
| Unlabeled Sessions | 900,000+ |
| Behavioral Features | 200+ derived dimensions |
| Temporal Resolution | 100ms sampling (10/second) |
| Time Period | 18+ months longitudinal |
| Unique Websites | 250+ SMB websites |
| Industry Categories | 20 |
| Geographic Coverage | 50+ countries |
| Adversarial Samples | 50,000+ labeled evasion attempts |

### 2.2 Data Sources

- **Production traffic:** Real visitor sessions from live SMB websites
- **Adversarial traffic:** Controlled bot traffic with documented evasion techniques
- **Traffic mix:** Paid search, paid social, organic, direct, referral

### 2.3 Key Dataset Characteristics

1. **Scale + Depth:** 3M sessions with 200+ features each—no existing dataset combines both
2. **Temporal precision:** 100ms resolution enables micro-pattern analysis
3. **Session sequences:** Full user journeys, not isolated events
4. **Adversarial samples:** 50K+ labeled evasion attempts for robustness research
5. **Multi-tier labels:** Hard + soft labels enable supervised and semi-supervised research
6. **CAPTCHA verification:** Cloudflare Turnstile provides additional ground truth
7. **Longitudinal coverage:** 18+ months captures seasonal fraud patterns

---

## 3. Data Collection Methodology

### 3.1 Behavioral Signal Collection

The AdTruth SDK captures behavioral signals at 100ms resolution (10 samples per second):

#### Mouse Dynamics (50+ features)

| Signal Category | Features | Description |
|-----------------|----------|-------------|
| **Velocity** | avg, max, min, std, percentiles | Movement speed (px/s) |
| **Acceleration** | avg, max, jerk | Rate of velocity change |
| **Direction** | angle_changes, curvature | Path characteristics |
| **Pauses** | pause_count, pause_duration | Movement interruptions |
| **Trajectory** | path_efficiency, straightness | Movement quality |

#### Scroll Behavior (30+ features)

| Signal Category | Features | Description |
|-----------------|----------|-------------|
| **Depth** | max, avg, progression | Scroll extent |
| **Velocity** | avg, max, smoothness | Scroll speed |
| **Patterns** | reversals, pauses, acceleration | Scroll behavior |
| **Timing** | time_to_scroll, scroll_duration | Temporal patterns |

#### Click Patterns (25+ features)

| Signal Category | Features | Description |
|-----------------|----------|-------------|
| **Timing** | time_to_first, intervals, rhythm | Click temporal patterns |
| **Precision** | target_accuracy, miss_rate | Click accuracy |
| **Sequences** | double_clicks, rage_clicks | Click patterns |

#### Touch Dynamics (Mobile, 30+ features)

| Signal Category | Features | Description |
|-----------------|----------|-------------|
| **Taps** | pressure, duration, intervals | Tap characteristics |
| **Swipes** | velocity, direction, length | Swipe patterns |
| **Gestures** | pinch, rotate, multi-touch | Complex interactions |

#### Session-Level Features (40+ features)

| Signal Category | Features | Description |
|-----------------|----------|-------------|
| **Temporal** | session_duration, active_time, idle_time | Time patterns |
| **Navigation** | page_sequence, back_buttons, tab_switches | Journey patterns |
| **Engagement** | interaction_density, attention_score | Behavior quality |

### 3.2 Server-Side Enrichment

#### IP Reputation & Network Features

| Feature | Description |
|---------|-------------|
| `ip_reputation_score` | Fraud risk score (0.0-1.0) |
| `is_datacenter` | Hosting/datacenter IP flag |
| `is_proxy` | Proxy detection |
| `is_vpn` | VPN detection |
| `ip_cluster_id` | Network clustering for graph analysis |
| `ip_velocity` | Unique IPs per device fingerprint |

### 3.3 Adversarial Bot Sample Generation

To enable robustness research, we include labeled adversarial bot traffic:

| Bot Type | Evasion Technique | Sample Count |
|----------|-------------------|--------------|
| `naive_headless` | Basic Selenium/Puppeteer | 10,000+ |
| `human_timing` | Injected realistic delays | 10,000+ |
| `mouse_replay` | Recorded human mouse paths | 8,000+ |
| `ml_generated` | GAN-generated behavioral patterns | 8,000+ |
| `residential_proxy` | Rotating residential IPs | 7,000+ |
| `fingerprint_spoof` | Canvas/WebGL manipulation | 7,000+ |

Each adversarial sample is labeled with:
- `is_adversarial: true`
- `evasion_technique`: taxonomy category
- `evasion_sophistication`: 1-5 scale
- `detection_difficulty`: estimated based on signal analysis

---

## 4. Ground Truth Labeling

### 4.1 Multi-Tier Label Structure

AdTruth provides three tiers of labels to support diverse research approaches:

| Tier | Confidence | Method | Coverage | Use Case |
|------|------------|--------|----------|----------|
| Hard Labels | 90-100% | Physics impossibilities + CAPTCHA | 300K+ sessions | Supervised learning |
| Soft Labels | 50-90% | Ensemble scoring | 1.8M+ sessions | Semi-supervised, weak supervision |
| Unlabeled | N/A | N/A | 900K+ sessions | Self-supervised, unsupervised |

### 4.2 Hard Labels: Physics-Based Ground Truth

Hard labels are assigned when behavioral impossibilities are detected:

| Impossibility Type | Detection Criteria | Confidence |
|-------------------|-------------------|------------|
| `superhuman_velocity` | Mouse velocity > 5000 px/s | 0.95 |
| `instant_reaction` | First click < 200ms | 0.95 |
| `impossible_scroll` | 90% depth in < 100ms | 0.95 |
| `zero_interaction_ghost` | 10s+ with zero input | 0.90 |
| `rapid_fire_clicks` | > 100 clicks/second | 1.00 |
| `fast_exit_no_input` | < 3s with zero interaction | 1.00 |

### 4.2.1 CAPTCHA Verification (Cloudflare Turnstile)

In addition to physics-based detection, we use Cloudflare Turnstile challenges on a subset of sessions:

- **Challenge rate:** Approximately 5% of sessions receive CAPTCHA challenges
- **Pass = Human label:** Sessions passing Turnstile receive `human` hard label (0.95 confidence)
- **Fail = Bot label:** Sessions failing Turnstile receive `bot` hard label (0.98 confidence)
- **Skip/Exit:** Sessions where users skip or exit before completing are excluded from hard labels to avoid false positives

This dual approach (physics impossibilities + CAPTCHA verification) provides complementary ground truth signals.

### 4.3 Soft Labels: Ensemble Scoring

For sessions without hard labels, soft labels are derived from multiple signals:

```json
{
  "fraud_probability": 0.73,
  "fraud_signals": {
    "ip_reputation_score": 0.85,
    "behavioral_anomaly_score": 0.68,
    "device_fingerprint_score": 0.45,
    "temporal_anomaly_score": 0.72
  },
  "label_confidence": 0.65
}
```

### 4.4 Label Hierarchy (Multi-Label)

Each session can have multiple fraud signals:

```
fraud_taxonomy:
├── bot_automated
│   ├── headless_browser
│   ├── selenium_webdriver
│   └── api_scripted
├── bot_datacenter
│   ├── cloud_provider
│   └── hosting_service
├── bot_proxy
│   ├── residential_proxy
│   ├── vpn
│   └── tor
├── behavioral_anomaly
│   ├── mouse_anomaly
│   ├── scroll_anomaly
│   └── timing_anomaly
└── coordinated_fraud
    ├── click_farm
    └── ip_rotation
```

### 4.5 100% Labeled Subset

For researchers preferring fully-labeled data, we provide a curated subset:
- 300,000+ sessions with hard labels only
- Balanced distribution: ~40% bot, ~40% human, ~20% suspicious
- All sessions include full 200+ behavioral features

---

## 5. Data Dictionary

### 5.1 Session Identifiers

| Field | Type | Description |
|-------|------|-------------|
| `session_id` | UUID | Unique session identifier |
| `visitor_id` | UUID | Cross-session visitor tracking |
| `website_id` | UUID | Website identifier (anonymized) |
| `timestamp` | TIMESTAMPTZ | Session start time (UTC) |

### 5.2 Behavioral Features (Nested JSON)

**Example 1: Verified Human Session**

```json
{
  "session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "hard_label": "human",
  "hard_label_confidence": 0.95,
  "label_method": "captcha_pass",
  "mouse": {
    "velocity": {"avg": 450, "max": 1200, "std": 180},
    "acceleration": {"avg": 85, "max": 340},
    "direction": {"angle_changes": 47, "curvature": 0.32},
    "pauses": {"count": 12, "avg_duration": 450},
    "trajectory": {"efficiency": 0.78, "straightness": 0.65},
    "sample_count": 284
  },
  "scroll": {
    "depth": {"max": 0.85, "avg": 0.42},
    "velocity": {"avg": 120, "max": 890},
    "patterns": {"reversals": 3, "smooth_ratio": 0.89}
  },
  "clicks": {
    "count": 4,
    "intervals": [2340, 1890, 3200],
    "time_to_first": 3400,
    "precision_score": 0.92
  },
  "session": {
    "duration": 47000,
    "active_time": 38000,
    "idle_time": 9000,
    "pages_viewed": 3,
    "interaction_density": 0.81
  },
  "ip_reputation_score": 0.12,
  "ip_type": "residential"
}
```

**Example 2: Confirmed Bot Session (Physics Impossibility)**

```json
{
  "session_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "hard_label": "bot",
  "hard_label_confidence": 1.00,
  "label_method": "rapid_fire_clicks",
  "fraud_taxonomy": ["bot_automated", "behavioral_anomaly"],
  "mouse": {
    "velocity": {"avg": 2850, "max": 8500, "std": 45},
    "acceleration": {"avg": 1450, "max": 4100},
    "direction": {"angle_changes": 3, "curvature": 0.98},
    "pauses": {"count": 0, "avg_duration": 0},
    "trajectory": {"efficiency": 0.99, "straightness": 0.99},
    "sample_count": 89
  },
  "scroll": {
    "depth": {"max": 0.95, "avg": 0.95},
    "velocity": {"avg": 8500, "max": 12000},
    "patterns": {"reversals": 0, "smooth_ratio": 0.02}
  },
  "clicks": {
    "count": 47,
    "intervals": [85, 82, 88, 84, 86],
    "time_to_first": 145,
    "precision_score": 1.00
  },
  "session": {
    "duration": 4200,
    "active_time": 4200,
    "idle_time": 0,
    "pages_viewed": 1,
    "interaction_density": 0.99
  },
  "ip_reputation_score": 0.89,
  "ip_type": "datacenter"
}
```

**Key differences:** The bot session shows superhuman mouse velocity (8500 px/s max), perfectly regular click intervals (~85ms), zero pauses, instant scroll to 95% depth, and datacenter IP. This example represents extreme automated behavior—in practice, bots exhibit varying sophistication levels (e.g., replay bots show realistic movement but unnatural timing).

### 5.3 Labels

| Field | Type | Description |
|-------|------|-------------|
| `hard_label` | ENUM | `bot`, `human`, `suspicious`, `null` |
| `hard_label_confidence` | FLOAT | 0.90-1.00 for hard labels |
| `soft_label_probability` | FLOAT | Ensemble fraud probability 0.0-1.0 |
| `fraud_signals` | JSON | Individual signal scores |
| `fraud_taxonomy` | ARRAY | Multi-label taxonomy tags |
| `is_adversarial` | BOOLEAN | Adversarial bot sample flag |
| `evasion_technique` | STRING | Evasion method if adversarial |

### 5.4 Traffic Source

| Field | Type | Description |
|-------|------|-------------|
| `traffic_category` | ENUM | Paid Search, Paid Social, Organic, Direct, Referral |
| `traffic_source` | STRING | google, facebook, bing, etc. |
| `campaign_id` | UUID | Campaign identifier (anonymized) |
| `ad_platform` | STRING | Advertising platform |

### 5.5 Network Features

| Field | Type | Description |
|-------|------|-------------|
| `ip_reputation_score` | FLOAT | 0.0-1.0 fraud risk |
| `ip_type` | ENUM | residential, datacenter, proxy, vpn |
| `ip_cluster_id` | INT | Network clustering group |
| `geo_country` | STRING | Country code |
| `geo_region` | STRING | Region/state |

---

## 6. Exploratory Statistics

### 6.1 Dataset Overview

| Metric | Value |
|--------|-------|
| Total sessions | 3,000,000+ |
| Hard-labeled sessions | 300,000+ |
| Soft-labeled sessions | 1,800,000+ |
| Behavioral feature dimensions | 200+ |
| Temporal resolution | 100ms |
| Adversarial samples | 50,000+ |
| Unique websites | 250+ |
| Industries | 20 categories |
| Time span | 18+ months |
| Geographic coverage | 50+ countries |

### 6.2 Label Distribution

| Label | Hard-Labeled Subset (300K) | Full Dataset (Soft) |
|-------|--------------------|--------------------|
| Bot (high confidence) | 40% (~120,000) | 12% |
| Human (verified) | 40% (~120,000) | 48% |
| Suspicious | 20% (~60,000) | 10% |
| Unlabeled | 0% | 30% |

## 7. Known Limitations and Biases

### 7.1 Selection Bias

- **Convenience sampling:** SMB websites using AdTruth platform
- **Geographic skew:** US-concentrated (55%), with growing international coverage
- **Industry skew:** Over-representation of legal, e-commerce, healthcare

### 7.2 Label Limitations

- **Hard labels only for extreme cases:** Borderline fraud may be unlabeled
- **Adversarial samples are controlled:** May not represent all wild evasion techniques
- **Soft label accuracy:** Ensemble scores are estimates, not ground truth

### 7.3 Technical Limitations

- **JavaScript dependency:** Sessions without JS execution are excluded
- **Mobile behavior differences:** Touch patterns have different distributions than desktop
- **Privacy tool interference:** Ad blockers may affect fingerprinting signals

### 7.4 Potential Confounds

| Signal | May Indicate Fraud | Alternative Explanation |
|--------|-------------------|------------------------|
| Fast exit | Bot | Wrong page / slow load |
| Zero interaction | Bot | Reading without scrolling |
| Datacenter IP | Bot | Corporate VPN |
| High velocity | Bot | Gaming mouse / high DPI |

---

## 8. Ethical Considerations

### 8.1 Privacy Preservation

**Anonymization applied:**
- IP addresses: Hashed, with reputation scores preserved
- Website IDs: Random identifiers
- Timestamps: Generalized to hour
- URLs: Path patterns only, domains removed
- No PII collected or stored

**Informed consent:**
- All websites using AdTruth SDK display privacy notices informing visitors of data collection
- Visitors can opt out via browser Do Not Track (DNT) signals
- Data collection complies with GDPR Article 6(1)(f) (legitimate interest for fraud prevention)

### 8.2 Adversarial Sample Ethics

- Adversarial bots run only on consenting test websites
- No real advertiser budgets affected
- Techniques documented to improve industry defenses

### 8.3 Potential for Misuse

**Acknowledged risks:**
- Dataset could train adversarial bots
- Thresholds could inform evasion techniques

**Mitigations:**
- Non-commercial license
- Detection thresholds updated independently
- Academic use agreement required

### 8.4 Ethics Review

This dataset was collected as part of AdTruth's production fraud detection platform. While traditional IRB approval was not required for commercial service operations, we conducted an internal ethics review following ACM guidelines for data release. No personally identifiable information (PII) was collected, and all data was anonymized prior to dataset compilation.

## 9. Citation and Contact

### 9.1 Citation

**Citation information will be available upon dataset release (Target: Q3-Q4 2026)**

```
TBA - Zenodo DOI will be assigned upon publication
```

### 9.2 License

Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

### 9.3 Release Timeline

| Milestone | Target Date |
|-----------|-------------|
| Documentation preview | November 2025 |
| Researcher feedback period | December 2025 - March 2026 |
| Beta access (selected partners) | April - June 2026 |
| Public release | Q3-Q4 2026 |

### 9.4 Dataset Versioning

| Version | Target Date | Contents |
|---------|-------------|----------|
| v1.0.0 | Q3-Q4 2026 | Initial release (18 months of data) |
| v1.1.0 | Q1 2027 | +6 months longitudinal data |
| v1.2.0 | Q3 2027 | Additional adversarial samples |

### 9.5 Contact

- **Author:** Hongyi Shui
- **Email:** contact@adtruth.io
- **Website:** https://adtruth.io
- **GitHub:** https://github.com/papa-torb/adtruth

### 9.6 Early Access for Academic Research

Researchers interested in early access for academic publications can request a representative sample for validation studies. We are particularly interested in collaborations exploring:

- Temporal deep learning models (LSTMs, Transformers) for sequence-based detection
- Graph neural networks for coordinated fraud detection
- Semi-supervised and weak supervision approaches
- Cross-industry generalization and transfer learning

**What we offer:** Pre-release sample dataset + co-authorship opportunities

**What we need:** Research expertise + publication commitment

**To apply:** Email contact@adtruth.io with subject "AdTruth Research Access" including your research focus and relevant publications.

---

## References

Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum Associates.

Feher, C., et al. (2012). User identity verification via mouse dynamics. *Information Sciences*, 201, 19-36.

Oentaryo, R. J., et al. (2014). Detecting click fraud in online advertising: A data mining approach. *Journal of Machine Learning Research*, 15(99), 99-140.

---

*This is a preview document for the AdTruth dataset. Target release: Q3-Q4 2026. For early access inquiries or research collaboration, please contact the author.*
